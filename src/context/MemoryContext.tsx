import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  canonicalHistoricalProposals,
  canonicalProposalDraft,
  canonicalActiveRfps,
  calculateDatasetMetrics,
} from '../services/proposalData';
import { hindsightService } from '../services/hindsightService';
import type {
  HistoricalProposal,
  ProposalSectionContent,
  RFP,
  MemoryExperience,
  HindsightRecallResult,
  HindsightLogEvent,
} from '../types';

export interface MemoryEvent {
  id: string;
  title: string;
  quote: string;
  sourceRfp: string;
  client: string;
  outcome: 'won' | 'lost' | 'no-decision';
  availableTo: string;
  date: string;
  experience?: MemoryExperience;
}

interface MemoryContextType {
  memories: HistoricalProposal[];
  memoryCount: number;
  rfps: RFP[];
  proposalSections: ProposalSectionContent[];
  lastCreatedMemory: MemoryEvent | null;
  activeRfpId: string;
  setActiveRfpId: (id: string) => void;
  metrics: ReturnType<typeof calculateDatasetMetrics>;
  hindsightLogs: HindsightLogEvent[];
  hindsightStatus: {
    isConfigured: boolean;
    apiUrl: string;
    totalMemories: number;
    backendType: 'live_hindsight_api' | 'local_hindsight_engine';
  };
  addRetrospectiveMemory: (data: {
    rfpId: string;
    rfpTitle: string;
    client: string;
    industry: string;
    outcome: 'won' | 'lost' | 'no-decision';
    budget: string;
    whatHappened: string;
    clientFeedback: string;
    rootCause: string;
    organizationalLesson: string;
    tags?: string[];
  }) => MemoryEvent;
  injectRecommendation: (sectionId: string, textToInject: string, sourceProposal: string) => void;
  updateSectionContent: (sectionId: string, newContent: string) => void;
  runRecall: (query: { industry?: string; requirements?: string[]; text?: string }) => Promise<HindsightRecallResult>;
  resetToDefaults: () => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<HistoricalProposal[]>(() => {
    const saved = localStorage.getItem('hindsight_canonical_proposals_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return canonicalHistoricalProposals;
  });

  const [proposalSections, setProposalSections] = useState<ProposalSectionContent[]>(() => {
    const saved = localStorage.getItem('hindsight_proposal_sections_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return canonicalProposalDraft.sections;
  });

  const [lastCreatedMemory, setLastCreatedMemory] = useState<MemoryEvent | null>(() => {
    const saved = localStorage.getItem('hindsight_last_memory_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  const [activeRfpId, setActiveRfpId] = useState<string>('rfp-001');
  const [hindsightLogs, setHindsightLogs] = useState<HindsightLogEvent[]>(() => hindsightService.getOperationLogs());

  useEffect(() => {
    localStorage.setItem('hindsight_canonical_proposals_v3', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('hindsight_proposal_sections_v3', JSON.stringify(proposalSections));
  }, [proposalSections]);

  useEffect(() => {
    if (lastCreatedMemory) {
      localStorage.setItem('hindsight_last_memory_v3', JSON.stringify(lastCreatedMemory));
    }
  }, [lastCreatedMemory]);

  // Synchronize logs whenever Hindsight performs operations
  const refreshLogs = () => {
    setHindsightLogs(hindsightService.getOperationLogs());
  };

  const addRetrospectiveMemory = (data: {
    rfpId: string;
    rfpTitle: string;
    client: string;
    industry: string;
    outcome: 'won' | 'lost' | 'no-decision';
    budget: string;
    whatHappened: string;
    clientFeedback: string;
    rootCause: string;
    organizationalLesson: string;
    tags?: string[];
  }): MemoryEvent => {
    // Generate canonical memory ID like MEM-008
    const existingRetrospectives = memories.filter(m => m.id.startsWith('mem-') || m.id.startsWith('MEM-'));
    const memNumber = existingRetrospectives.length + 8;
    const newId = `MEM-00${memNumber}`;

    const normalizedOutcome = data.outcome === 'won' ? 'WON' : data.outcome === 'lost' ? 'LOST' : 'NO DECISION';
    const numericValue = parseInt(data.budget.replace(/[^0-9]/g, ''), 10) * 100000 || 2800000;

    const tags = data.tags && data.tags.length > 0
      ? data.tags
      : ['cloud-migration', 'banking', 'financial-services', 'rollback', 'compliance', 'phased-delivery'];

    // 1. Structure the full MemoryExperience for Hindsight retain
    const memoryExperience: MemoryExperience = {
      memoryId: newId,
      sourceProposal: `${data.rfpTitle} (${newId})`,
      outcome: normalizedOutcome as 'WON' | 'LOST' | 'NO DECISION',
      industry: data.industry,
      context: `${data.client} - ${data.rfpTitle} in ${data.industry}`,
      requirements: ['Cloud migration', 'Zero downtime', 'Regulatory compliance', 'Rollback capability'],
      failedApproaches: data.outcome === 'lost' ? [data.rootCause] : [],
      successfulApproaches: data.outcome === 'won' ? [data.whatHappened] : [],
      clientSignals: [data.clientFeedback],
      clientFeedback: data.clientFeedback,
      rootCause: data.rootCause,
      lesson: data.organizationalLesson,
      tags: tags,
      applicability: `Applicable to future enterprise ${data.industry} tenders requiring risk mitigation and high-availability execution`,
      timestamp: new Date().toISOString(),
    };

    // 2. Perform actual Hindsight RETAIN operation
    hindsightService.retainExperience(memoryExperience);

    // 3. Create the unified HistoricalProposal record for consistent table/detail views
    const newHistoricalRecord: HistoricalProposal = {
      id: newId.toUpperCase(),
      title: data.rfpTitle,
      rfpTitle: data.rfpTitle,
      client: data.client,
      industry: data.industry,
      outcome: data.outcome === 'won' ? 'won' : 'lost',
      value: data.budget,
      dealValue: numericValue,
      submittedDate: '2026-09-18',
      outcomeDate: '2026-09-28',
      budget: data.budget,
      keyFactors: [data.whatHappened],
      strategy: data.whatHappened,
      proposalApproach: data.whatHappened,
      failureReasons: data.outcome === 'lost' ? [data.rootCause] : undefined,
      successReasons: data.outcome === 'won' ? [data.rootCause] : undefined,
      rootCause: data.rootCause,
      clientFeedback: data.clientFeedback,
      lessonLearned: data.organizationalLesson,
      lessonsLearned: [data.organizationalLesson],
      memoryTags: tags,
      tags: tags,
      documentReferences: [`Synthetic RFP Specification — ${data.rfpTitle}.pdf`],
      source: 'retrospective',
    };

    setMemories(prev => [newHistoricalRecord, ...prev]);

    const event: MemoryEvent = {
      id: newId,
      title: data.rfpTitle,
      quote: data.clientFeedback,
      sourceRfp: data.rfpTitle,
      client: data.client,
      outcome: data.outcome,
      availableTo: `Future ${data.industry} RFP analysis`,
      date: '2026-09-28',
      experience: memoryExperience,
    };

    setLastCreatedMemory(event);
    refreshLogs();
    return event;
  };

  const injectRecommendation = (sectionId: string, textToInject: string, sourceProposal: string) => {
    setProposalSections(prev =>
      prev.map(section => {
        if (section.id === sectionId) {
          const attribution = `\n\n[MEMORY-GROUNDED SUGGESTION: Recalled from ${sourceProposal}]\n"${textToInject}"`;
          return {
            ...section,
            content: section.content + attribution,
            edited: true,
            evidenceUsed: [...(section.evidenceUsed || []), sourceProposal],
          };
        }
        return section;
      })
    );

    // Refresh telemetry logs so UI reflects the USE operation
    refreshLogs();
  };

  const updateSectionContent = (sectionId: string, newContent: string) => {
    setProposalSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, content: newContent, edited: true } : section
      )
    );
  };

  const runRecall = async (query: { industry?: string; requirements?: string[]; text?: string }): Promise<HindsightRecallResult> => {
    const result = await hindsightService.recallExperiences({
      industry: query.industry || 'Financial Services',
      requirements: query.requirements || ['Cloud migration', 'Minimal downtime', 'Compliance', 'Rollback controls'],
      queryText: query.text || 'Cloud migration with low downtime and compliance constraints',
      limit: 4,
    });
    refreshLogs();
    return result;
  };

  const resetToDefaults = () => {
    localStorage.removeItem('hindsight_canonical_proposals_v3');
    localStorage.removeItem('hindsight_proposal_sections_v3');
    localStorage.removeItem('hindsight_last_memory_v3');
    localStorage.removeItem('hindsight_memory_corpus_v3');
    localStorage.removeItem('hindsight_operation_logs_v3');
    setMemories(canonicalHistoricalProposals);
    setProposalSections(canonicalProposalDraft.sections);
    setLastCreatedMemory(null);
    hindsightService.resetCorpus();
    refreshLogs();
  };

  const metrics = calculateDatasetMetrics(memories);
  const status = hindsightService.getStatus();

  return (
    <MemoryContext.Provider
      value={{
        memories,
        memoryCount: memories.length,
        rfps: canonicalActiveRfps,
        proposalSections,
        lastCreatedMemory,
        activeRfpId,
        setActiveRfpId,
        metrics,
        hindsightLogs,
        hindsightStatus: status,
        addRetrospectiveMemory,
        injectRecommendation,
        updateSectionContent,
        runRecall,
        resetToDefaults,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemory() {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
}

