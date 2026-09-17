// Mock data and helpers for the Selection Scoring & Merit List page (#19).
// Scoring criteria follow docs/scheme-rulebook.md.
// Replace buildSelectionEntries() with GET /api/selection/merit-list once available.

import { ApplicationStatus } from '@/types';
import { MOCK_APPLICATIONS, type MockApplication } from './mock-data';

export interface ScoringCriterion {
  name: string;
  maxScore: number;
  description: string;
}

export type SelectionDecision = 'PENDING' | 'SELECTED' | 'REJECTED';

export interface SelectionEntry {
  application: MockApplication;
  scores: Record<string, number>;
  remarks: Record<string, string>;
  decision: SelectionDecision;
}

export const SCHEME_CRITERIA: Record<'NFST' | 'NOS', ScoringCriterion[]> = {
  NFST: [
    { name: 'Academic Performance', maxScore: 40, description: 'Based on qualifying exam marks' },
    { name: 'Research Proposal Quality', maxScore: 30, description: 'Relevance and quality (for Ph.D.)' },
    { name: 'NET/SET Score', maxScore: 20, description: 'NET/SET qualification' },
    { name: 'Other Factors', maxScore: 10, description: 'State representation, gender, etc.' },
  ],
  NOS: [
    { name: 'Academic Performance', maxScore: 40, description: 'Based on graduation/PG marks' },
    { name: 'University Ranking', maxScore: 25, description: 'QS/THE ranking of foreign university' },
    { name: 'Course Relevance', maxScore: 20, description: 'Relevance to national priorities' },
    { name: 'Other Factors', maxScore: 15, description: 'State representation, gender, etc.' },
  ],
};

const POOL_STATUSES = [
  ApplicationStatus.SCRUTINY_COMPLETE,
  ApplicationStatus.UNDER_SCREENING,
  ApplicationStatus.SELECTED,
  ApplicationStatus.APPROVED,
];

// Deterministic score ratios so the demo merit list is stable across renders.
const RATIOS = [0.92, 0.84, 0.77, 0.71, 0.88, 0.65, 0.81, 0.74, 0.69, 0.86];

function defaultScores(criteria: ScoringCriterion[], seed: number): Record<string, number> {
  return criteria.reduce<Record<string, number>>((acc, criterion, index) => {
    const ratio = RATIOS[(seed + index) % RATIOS.length];
    acc[criterion.name] = Math.round(criterion.maxScore * ratio);
    return acc;
  }, {});
}

export function getCriteria(schemeCode: 'NFST' | 'NOS'): ScoringCriterion[] {
  return SCHEME_CRITERIA[schemeCode];
}

export function maxTotal(schemeCode: 'NFST' | 'NOS'): number {
  return getCriteria(schemeCode).reduce((sum, criterion) => sum + criterion.maxScore, 0);
}

export function totalScore(entry: SelectionEntry): number {
  return getCriteria(entry.application.schemeCode).reduce(
    (sum, criterion) => sum + (entry.scores[criterion.name] ?? 0),
    0
  );
}

export function getSelectionPool(): MockApplication[] {
  return MOCK_APPLICATIONS.filter((a) => POOL_STATUSES.includes(a.status));
}

export function buildSelectionEntries(): SelectionEntry[] {
  return getSelectionPool().map((application, index) => {
    const criteria = getCriteria(application.schemeCode);
    const decision: SelectionDecision =
      application.status === ApplicationStatus.SELECTED || application.status === ApplicationStatus.APPROVED
        ? 'SELECTED'
        : 'PENDING';

    return {
      application,
      scores: defaultScores(criteria, index),
      remarks: {},
      decision,
    };
  });
}
