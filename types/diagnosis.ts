export type Goal = "coding" | "aptitude" | "communication" | "career";

export type QuestionType = "mcq" | "rating";

export type QuestionOption = {
  id: string;
  label: string;
  score: number;
};

export type Question = {
  id: string;
  goal: Goal;
  type: QuestionType;
  category: string;
  prompt: string;
  options?: QuestionOption[];
};

export type GoalSelection = {
  goal: Goal;
  careerTrack?: string;
  mentorCategory?: "tech" | "non-tech";
};

export type AnswerMap = Record<string, string | number>;

export type DiagnosisResult = {
  goal: GoalSelection;
  score: number;
  weakAreas: string[];
  strengths: string[];
  weaknesses: string[];
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  completedAt: string;
};

export type RoadmapDay = {
  day: number;
  title: string;
  task: string;
  resource: string;
};
