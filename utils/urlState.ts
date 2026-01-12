
import { PDAData } from '../types.ts';

const mapping: Record<string, string> = {
  employee: 'e',
  reflection: 'r',
  roleExpectations: 're',
  upcomingFocus: 'u',
  managerFeedback: 'm',
  confirmation: 'c',
  submissionDate: 'd',
  fullName: 'fn',
  employeeId: 'ei',
  department: 'dp',
  position: 'ps',
  managerEmail: 'me',
  employeeMostProudOf: 'emp',
  employeeChallengingLearned: 'ecl',
  managerMostProudOf: 'mmp',
  managerChallengingLearned: 'mcl',
  employeeRating: 'ert',
  employeeRatingDescription: 'erd',
  employeeComment: 'ecm',
  managerRating: 'mrt',
  managerRatingDescription: 'mrd',
  managerComment: 'mcm',
  employeeBusinessFocus: 'ebf',
  employeeDevelopmentFocus: 'edf',
  managerBusinessFocus: 'mbf',
  managerDevelopmentFocus: 'mdf',
  employeeAnswer: 'ea',
  managerAnswer: 'ma',
  hadConversation: 'hc'
};

const reverseMapping: Record<string, string> = Object.fromEntries(
  Object.entries(mapping).map(([k, v]) => [v, k])
);

const transform = (obj: any, map: Record<string, string>): any => {
  if (Array.isArray(obj)) return obj.map(v => transform(v, map));
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [map[k] || k, transform(v, map)])
    );
  }
  return obj;
};

export const encodeState = (data: PDAData): string => {
  try {
    const minified = transform(data, mapping);
    const jsonString = JSON.stringify(minified);
    return btoa(encodeURIComponent(jsonString));
  } catch (e) {
    console.error('Failed to encode state', e);
    return '';
  }
};

export const decodeState = (encoded: string): PDAData | null => {
  try {
    const jsonString = decodeURIComponent(atob(encoded));
    const minified = JSON.parse(jsonString);
    return transform(minified, reverseMapping) as PDAData;
  } catch (e) {
    console.error('Failed to decode state', e);
    return null;
  }
};

export const getMagicLink = (data: PDAData): string => {
  const encoded = encodeState(data);
  const url = window.location.origin + window.location.pathname;
  return `${url}?data=${encoded}`;
};
