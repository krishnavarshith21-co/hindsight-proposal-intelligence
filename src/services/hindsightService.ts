import type {
  MemoryExperience,
  HindsightRecallQuery,
  HindsightRecallResult,
  GroundedRecommendation,
  HindsightLogEvent,
} from '../types';
import { initialHindsightCorpus } from './proposalData';

const HINDSIGHT_STORAGE_KEY = 'hindsight_memory_corpus_v3';
const HINDSIGHT_LOGS_KEY = 'hindsight_operation_logs_v3';

class HindsightService {
  private corpus: MemoryExperience[];
  private logs: HindsightLogEvent[];
  private apiUrl: string | undefined;
  private apiKey: string | undefined;

  constructor() {
    this.apiUrl = import.meta.env.VITE_HINDSIGHT_API_URL;
    this.apiKey = import.meta.env.VITE_HINDSIGHT_API_KEY;

    // Load persisted corpus or initialize with canonical seed experiences
    const savedCorpus = localStorage.getItem(HINDSIGHT_STORAGE_KEY);
    if (savedCorpus) {
      try {
        this.corpus = JSON.parse(savedCorpus);
      } catch (e) {
        this.corpus = [...initialHindsightCorpus];
      }
    } else {
      this.corpus = [...initialHindsightCorpus];
      this.persistCorpus();
    }

    // Load or initialize logs
    const savedLogs = localStorage.getItem(HINDSIGHT_LOGS_KEY);
    if (savedLogs) {
      try {
        this.logs = JSON.parse(savedLogs);
      } catch (e) {
        this.logs = [];
      }
    } else {
      this.logs = [];
      // Log initial seed retention
      this.addLog(
        'RETAIN',
        'Initial Hindsight Corpus Seeded',
        `Seeded ${initialHindsightCorpus.length} historical experiences into Hindsight memory.`
      );
    }
  }

  private persistCorpus() {
    try {
      localStorage.setItem(HINDSIGHT_STORAGE_KEY, JSON.stringify(this.corpus));
    } catch (e) {
      console.warn('Failed to persist Hindsight corpus', e);
    }
  }

  private persistLogs() {
    try {
      localStorage.setItem(HINDSIGHT_LOGS_KEY, JSON.stringify(this.logs));
    } catch (e) {
      console.warn('Failed to persist Hindsight logs', e);
    }
  }

  private logCounter = 0;

  private addLog(
    operation: 'RETAIN' | 'RECALL' | 'USE' | 'LEARN',
    title: string,
    details: string,
    sourceId?: string,
    payload?: any
  ) {
    this.logCounter += 1;
    const event: HindsightLogEvent = {
      id: `log-${Date.now()}-${this.logCounter}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      operation,
      title,
      details,
      sourceId,
      payload,
    };
    this.logs.unshift(event);
    if (this.logs.length > 50) this.logs = this.logs.slice(0, 50);
    this.persistLogs();
  }

  public getOperationLogs(): HindsightLogEvent[] {
    return [...this.logs];
  }

  public getStatus() {
    const isLiveApi = Boolean(this.apiUrl && this.apiKey);
    return {
      isConfigured: isLiveApi,
      isLiveApiConnected: isLiveApi,
      apiUrl: this.apiUrl || 'Local Persistent Engine (Ready for VITE_HINDSIGHT_API_URL)',
      backendType: isLiveApi ? ('live_hindsight_api' as const) : ('local_hindsight_engine' as const),
      totalMemories: this.corpus.length,
      totalRetained: this.corpus.length,
      statusLabel: isLiveApi
        ? 'Live Hindsight API Connected'
        : 'Local Persistent Engine (Active in browser memory & localStorage)',
      integrationNote: isLiveApi
        ? 'Direct HTTP REST integration with remote Hindsight instance.'
        : 'Running local client-side memory graph. Set VITE_HINDSIGHT_API_URL and VITE_HINDSIGHT_API_KEY to route to remote instance.',
    };
  }

  public resetCorpus() {
    this.corpus = [...initialHindsightCorpus];
    this.persistCorpus();
    this.logs = [];
    this.addLog(
      'RETAIN',
      'Hindsight Corpus Reset to Initial Canonical Seed',
      `Restored ${initialHindsightCorpus.length} canonical historical experiences into Hindsight organizational memory.`
    );
  }

  public getAllRetainedExperiences(): MemoryExperience[] {
    return [...this.corpus];
  }

  // ============================================================
  // HINDSIGHT RETAIN (Section 6 & 12)
  // ============================================================
  public async retainExperience(experience: MemoryExperience): Promise<{ success: boolean; memoryId: string }> {
    // If live API is configured, dispatch HTTP POST to Hindsight backend
    if (this.apiUrl && this.apiKey) {
      try {
        const response = await fetch(`${this.apiUrl}/v1/memories/retain`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(experience),
        });
        if (response.ok) {
          const data = await response.json();
          this.addLog('RETAIN', `Retained to Remote Hindsight (${experience.memoryId})`, `Live API acknowledged memory retention: ${experience.sourceProposalTitle}`, experience.memoryId);
          return { success: true, memoryId: data.memoryId || experience.memoryId };
        }
      } catch (err) {
        console.warn('Hindsight remote API retain failed, falling back to local engine', err);
      }
    }

    // Client-side persistent Hindsight engine
    const existingIndex = this.corpus.findIndex(m => m.memoryId === experience.memoryId);
    if (existingIndex >= 0) {
      this.corpus[existingIndex] = experience;
    } else {
      this.corpus.unshift(experience);
    }
    this.persistCorpus();

    this.addLog(
      'LEARN',
      `New Experience Encoded (${experience.memoryId})`,
      `Outcome: ${experience.outcome} · ${experience.sourceProposalTitle} (${experience.client}). Lesson: "${experience.lesson}"`,
      experience.memoryId
    );

    return { success: true, memoryId: experience.memoryId };
  }

  // ============================================================
  // HINDSIGHT RECALL (Section 7, 8, 9, 10)
  // ============================================================
  public async recallExperiences(query: HindsightRecallQuery): Promise<HindsightRecallResult> {
    this.addLog(
      'RECALL',
      `Querying Hindsight Memory`,
      `Query Scope: Industry=${query.industry} | Requirements=[${query.requirements.slice(0, 3).join(', ')}]`
    );

    // If live API is configured, query Hindsight endpoint
    if (this.apiUrl && this.apiKey) {
      try {
        const response = await fetch(`${this.apiUrl}/v1/memories/recall`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(query),
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (err) {
        console.warn('Hindsight remote API recall failed, falling back to local engine', err);
      }
    }

    // Contextual semantic matching
    const queryIndustry = query.industry.toLowerCase();
    const contextText = query.context || query.queryText || query.text || '';
    const queryKeywords = [
      ...query.requirements.map(r => r.toLowerCase()),
      ...contextText.toLowerCase().split(/\s+/).filter(Boolean),
    ];

    // Score experiences based on industry match, risk factors, requirements, and keywords
    const scored = this.corpus.map(exp => {
      let score = 0;
      const reasons: string[] = [];

      // Industry matching (Banking and Financial Services are treated as cognate regulated sectors)
      const expIndustry = exp.industry.toLowerCase();
      if (expIndustry === queryIndustry) {
        score += 40;
        reasons.push('Same industry sector');
      } else if (
        (queryIndustry.includes('financial') && expIndustry.includes('banking')) ||
        (queryIndustry.includes('banking') && expIndustry.includes('financial'))
      ) {
        score += 35;
        reasons.push('Cognate regulated financial sector');
      }

      // Keyword & Tag matching
      let tagMatches = 0;
      exp.tags.forEach(tag => {
        if (queryKeywords.some(kw => kw.includes(tag) || tag.includes(kw))) {
          tagMatches++;
        }
      });
      if (tagMatches > 0) {
        score += Math.min(tagMatches * 15, 45);
        if (exp.tags.includes('cloud migration') || exp.tags.includes('cloud') || exp.tags.includes('migration')) {
          reasons.push('Similar cloud migration requirement');
        }
        if (exp.tags.includes('rollback') || exp.tags.includes('timeline') || exp.tags.includes('execution risk')) {
          reasons.push('Similar downtime & rollback concern');
        }
        if (exp.tags.includes('compliance') || exp.tags.includes('security')) {
          reasons.push('Similar regulatory compliance requirement');
        }
      }

      // Outcome consideration (both wins and losses are valuable)
      if (exp.outcome === 'WON') {
        reasons.push('Successful tender outcome (Winning precedent)');
      } else {
        reasons.push('Previous loss debrief (Critical risk factor to avoid)');
      }

      return {
        exp,
        score,
        reasons: reasons.slice(0, 5),
      };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Return the top matching experiences
    const topMatches = scored.slice(0, 4);
    const recalledExperiences: MemoryExperience[] = topMatches.map(m => {
      const isWon = m.exp.outcome === 'WON' || m.exp.outcome === 'won';
      const feedbackStr = typeof m.exp.clientSignals === 'string'
        ? m.exp.clientSignals
        : Array.isArray(m.exp.clientSignals)
          ? m.exp.clientSignals[0]
          : m.exp.clientFeedback || '';

      return {
        ...m.exp,
        sourceProposal: `${m.exp.sourceProposalTitle || m.exp.sourceProposalId} (${m.exp.sourceProposalId})`,
        relevanceReasons: m.reasons,
        matchConfidence: `Supported by precedent ${m.exp.sourceProposalId}`,
        clientFeedback: feedbackStr,
        outcome: isWon ? 'WON' : 'LOST',
      };
    });

    const relevanceReasons: Record<string, string[]> = {};
    topMatches.forEach(m => {
      if (m.exp.sourceProposalId) {
        relevanceReasons[m.exp.sourceProposalId] = m.reasons;
      }
    });

    // Derive observed pattern dynamically from the recalled experiences
    const wonMemories = recalledExperiences.filter(e => e.outcome === 'WON');
    const lostMemories = recalledExperiences.filter(e => e.outcome === 'LOST');

    const wonIds = wonMemories.map(e => `#${e.sourceProposalId || e.memoryId}`);
    const lostIds = lostMemories.map(e => `#${e.sourceProposalId || e.memoryId}`);

    let observedPattern = `Observed pattern across ${recalledExperiences.length} retrieved historical experiences (${wonIds.join(', ')} WON; ${lostIds.length > 0 ? lostIds.join(', ') + ' LOST' : 'All WON'}): `;
    if (wonMemories.length > 0) {
      const topWonLesson = wonMemories[0].lesson;
      observedPattern += `Successful bids in ${query.industry} demonstrated that ${topWonLesson.toLowerCase().replace(/\.$/, '')}. `;
    }
    if (lostMemories.length > 0) {
      const topLostReason = lostMemories[0].rootCause || lostMemories[0].lesson;
      observedPattern += `Conversely, failed bids suffered because ${topLostReason.toLowerCase().replace(/\.$/, '')}.`;
    }

    // Generate grounded recommendations derived directly from recalled memories
    const recommendations: GroundedRecommendation[] = [];

    // Rec 1: Compliance & Verification
    const complianceExps = recalledExperiences.filter(e =>
      e.tags.some(t => t.includes('compliance') || t.includes('security') || t.includes('trust'))
    );
    if (complianceExps.length > 0) {
      const compIds = complianceExps.map(e => `#${e.sourceProposalId || e.memoryId}`);
      recommendations.push({
        id: 'rec-01',
        recNumber: '01',
        title: 'Lead with compliance and security credentials.',
        confidenceLabel: `Supported by ${compIds.length} retrieved experience${compIds.length > 1 ? 's' : ''}`,
        basedOn: compIds,
        groundedInProposals: complianceExps.map(e => `${e.sourceProposalId} (${e.outcome})`),
        currentSignal: query.requirements.find(r => r.toLowerCase().includes('compliance') || r.toLowerCase().includes('pci') || r.toLowerCase().includes('hipaa') || r.toLowerCase().includes('audit')) || 'Client mandates verifiable regulatory compliance credentials.',
        observedPattern: `Early compliance proof in Section 1 established evaluator trust before technical deep dives (observed in ${compIds.join(', ')}).`,
        description: 'Position verified SOC 2 Type II audit artifacts and zero-disruption SLA guarantees in Section 1 Executive Summary.',
        specificRecommendation: 'Present audited compliance artifacts and zero-disruption SLAs directly in Section 1 Executive Summary.',
        targetSection: 'executive-summary',
        snippetToInject: 'Our delivery model leads with upfront SOC 2 Type II audit artifacts and an audited zero-disruption SLA guarantee, directly addressing operational compliance parameters.',
      });
    }

    // Rec 2: Staged Delivery & Rollback Controls
    const rollbackExps = recalledExperiences.filter(e =>
      e.tags.some(t => t.includes('rollback') || t.includes('timeline') || t.includes('migration') || t.includes('execution risk'))
    );
    if (rollbackExps.length > 0) {
      const rollIds = rollbackExps.map(e => `#${e.sourceProposalId || e.memoryId}`);
      recommendations.push({
        id: 'rec-02',
        recNumber: '02',
        title: 'Structure delivery into sequential rollback-gated phases.',
        confidenceLabel: `Supported by ${rollIds.length} retrieved experience${rollIds.length > 1 ? 's' : ''}`,
        basedOn: rollIds,
        groundedInProposals: rollbackExps.map(e => `${e.sourceProposalId} (${e.outcome})`),
        currentSignal: query.requirements.find(r => r.toLowerCase().includes('downtime') || r.toLowerCase().includes('rollback')) || 'Evaluation committee heavily penalizes execution volatility and unbuffered migration schedules.',
        observedPattern: `Aggressive unbuffered schedules triggered disqualification on execution risk, whereas phased cutovers with rollback gates succeeded (supported by ${rollIds.join(', ')}).`,
        description: 'Structure migration into 3 distinct gates with mandatory stabilization buffers and automated rollback checkpoints.',
        specificRecommendation: 'Structure migration into 3 distinct gates: Phase 1 (Non-clearing telemetry), Phase 2 (Secondary partition), and Phase 3 (Primary ledger cutover with automated rollback points).',
        targetSection: 'implementation',
        snippetToInject: 'Our migration approach includes isolated staging, rollback gates, and phased production cutover: Phase 1 (Non-clearing telemetry), Phase 2 (Secondary partition), and Phase 3 (Primary ledger cutover with automated rollback points).',
      });
    }

    // Rec 3: Commercial Framing & TCO
    const commercialExps = recalledExperiences.filter(e =>
      e.tags.some(t => t.includes('retail') || t.includes('business value') || t.includes('pricing') || e.outcome === 'WON')
    );
    if (commercialExps.length > 0) {
      const commIds = commercialExps.slice(0, 2).map(e => `#${e.sourceProposalId || e.memoryId}`);
      recommendations.push({
        id: 'rec-03',
        recNumber: '03',
        title: 'Provide transparent, capped monthly pod pricing with outcome gates.',
        confidenceLabel: `Supported by ${commIds.length} retrieved experience${commIds.length > 1 ? 's' : ''}`,
        basedOn: commIds,
        groundedInProposals: commercialExps.slice(0, 2).map(e => `${e.sourceProposalId} (${e.outcome})`),
        currentSignal: 'Procurement requested predictable 3-year TCO and capped operational support terms.',
        observedPattern: `Enterprise procurement rejects open-ended retainers in favor of predictable, capped operational run-rates (evidenced in ${commIds.join(', ')}).`,
        description: 'Structure commercial terms with fixed-capacity operational pods with quarterly outcome gates, eliminating hourly billing exposure.',
        specificRecommendation: 'Structure Section 5 (Pricing) with fixed monthly engineering pods and quarterly outcome gates, capping post-launch run-rate expenses.',
        targetSection: 'pricing',
        snippetToInject: 'Commercial terms are structured as fixed-capacity engineering pods with quarterly outcome gates, guaranteeing cost ceiling certainty across the lifecycle.',
      });
    }

    this.addLog(
      'USE',
      `Recommendations Grounded in ${recalledExperiences.length} Precedents`,
      `Grounded in: ${recalledExperiences.map(e => e.sourceProposalId || e.memoryId).join(', ')}`,
      recalledExperiences[0]?.sourceProposalId,
      {
        retrieved: recalledExperiences.map(e => ({
          id: e.sourceProposalId || e.memoryId,
          memoryId: e.memoryId,
          outcome: e.outcome,
          note: e.lesson,
        })),
      }
    );

    return {
      experiences: recalledExperiences,
      recalledExperiences,
      relevanceReasons,
      observedPattern,
      recommendations,
      queryMetadata: {
        timestamp: new Date().toISOString(),
        matchedCount: recalledExperiences.length,
        totalCorpusSize: this.corpus.length,
        backendType: this.getStatus().backendType,
      },
    };
  }
}

export const hindsightService = new HindsightService();
