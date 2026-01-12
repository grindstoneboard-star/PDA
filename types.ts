
export interface EmployeeInfo {
  fullName: string;
  employeeId: string;
  department: string;
  position: string;
  managerEmail: string;
}

export interface ReflectionData {
  employeeMostProudOf: string;
  employeeChallengingLearned: string;
  managerMostProudOf: string;
  managerChallengingLearned: string;
}

export interface RoleExpectationsData {
  employeeRating: string;
  employeeRatingDescription: string;
  employeeComment: string;
  managerRating: string;
  managerRatingDescription: string;
  managerComment: string;
}

export interface UpcomingFocusData {
  employeeBusinessFocus: string;
  employeeDevelopmentFocus: string;
  managerBusinessFocus: string;
  managerDevelopmentFocus: string;
}

export interface ManagerFeedbackData {
  employeeAnswer: string;
  managerAnswer: string;
}

export interface ConfirmationData {
  hadConversation: boolean;
  managerComment: string;
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

// Fixed missing interface reported as error in CompetencyForm.tsx
export interface CompetencyScore {
  category: string;
  score: number;
  comments: string;
}
