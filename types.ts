
export interface EmployeeInfo {
  fullName: string;
  employeeId: string;
  department: string;
  position: string;
  managerEmail: string;
}

export interface ReflectionData {
  mostProudOf: string;
  challengingLearned: string;
}

export interface RoleExpectationsData {
  rating: string;
  ratingDescription: string;
  comment: string;
}

export interface UpcomingFocusData {
  businessFocus: string;
  developmentFocus: string;
}

export interface ManagerFeedbackData {
  startStopContinue: string;
}

export interface ConfirmationData {
  hadConversation: boolean;
}

export interface PDAData {
  employee: EmployeeInfo;
  reflection: ReflectionData;
  roleExpectations: RoleExpectationsData;
  upcomingFocus: UpcomingFocusData;
  managerFeedback: ManagerFeedbackData;
  confirmation: ConfirmationData;
  submissionDate: string;
}

// Added missing CompetencyScore interface used in CompetencyForm.tsx
export interface CompetencyScore {
  category: string;
  score: number;
  comments: string;
}

export enum FormStep {
  IDENTIFICATION = 0,
  REFLECTION = 1,
  ROLE_EXPECTATIONS = 2,
  UPCOMING_FOCUS = 3,
  MANAGER_FEEDBACK = 4,
  CONFIRMATION = 5,
  SUMMARY = 6,
  COMPLETE = 7
}
