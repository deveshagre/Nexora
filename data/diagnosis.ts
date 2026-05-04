import type { Goal, Question } from "@/types/diagnosis";

export const goalLabels: Record<Goal, string> = {
  coding: "Coding",
  aptitude: "Aptitude",
  communication: "Communication",
  career: "Career Track",
};

export const careerTracks = [
  "Frontend Development",
  "Backend Development",
  "Data Analytics",
  "Product Management",
  "UI/UX Design",
];

const sharedSelfRatings = (goal: Goal): Question[] => [
  {
    id: `${goal}-confidence`,
    goal,
    type: "rating",
    category: "Confidence",
    prompt: "How confident are you when solving unfamiliar problems?",
  },
  {
    id: `${goal}-consistency`,
    goal,
    type: "rating",
    category: "Consistency",
    prompt: "How consistent is your weekly practice right now?",
  },
  {
    id: `${goal}-reflection`,
    goal,
    type: "rating",
    category: "Reflection",
    prompt: "How often do you review mistakes and improve your approach?",
  },
];

const mcq = (
  id: string,
  goal: Goal,
  category: string,
  prompt: string,
  options: Array<[string, string, number]>,
): Question => ({
  id,
  goal,
  type: "mcq",
  category,
  prompt,
  options: options.map(([optionId, label, score]) => ({
    id: optionId,
    label,
    score,
  })),
});

export const questions: Question[] = [
  mcq("coding-logic", "coding", "Problem Solving", "What is the output of 2 + 3 * 4?", [
    ["a", "20", 0],
    ["b", "14", 10],
    ["c", "24", 0],
    ["d", "9", 0],
  ]),
  mcq("coding-array", "coding", "Data Structures", "Which structure is best for first-in, first-out processing?", [
    ["a", "Stack", 2],
    ["b", "Queue", 10],
    ["c", "Tree", 4],
    ["d", "Set", 3],
  ]),
  mcq("coding-debug", "coding", "Debugging", "A loop never stops running. What should you inspect first?", [
    ["a", "The loop condition and update step", 10],
    ["b", "Only the file name", 0],
    ["c", "The font size", 0],
    ["d", "The package description", 0],
  ]),
  mcq("coding-api", "coding", "Web Basics", "What does an HTTP 404 response usually mean?", [
    ["a", "Server is overloaded", 3],
    ["b", "Resource was not found", 10],
    ["c", "Request succeeded", 0],
    ["d", "User is logged in", 0],
  ]),
  mcq("coding-git", "coding", "Tools", "What does Git primarily help developers manage?", [
    ["a", "Version history", 10],
    ["b", "Screen brightness", 0],
    ["c", "Network speed", 0],
    ["d", "Exam marks", 0],
  ]),
  ...sharedSelfRatings("coding"),

  mcq("aptitude-percent", "aptitude", "Percentages", "What is 20% of 250?", [
    ["a", "25", 2],
    ["b", "50", 10],
    ["c", "75", 0],
    ["d", "100", 0],
  ]),
  mcq("aptitude-ratio", "aptitude", "Ratios", "If 3 pens cost 60, what do 5 pens cost at the same rate?", [
    ["a", "80", 3],
    ["b", "90", 6],
    ["c", "100", 10],
    ["d", "120", 2],
  ]),
  mcq("aptitude-series", "aptitude", "Patterns", "Complete the series: 2, 4, 8, 16, __", [
    ["a", "18", 1],
    ["b", "24", 4],
    ["c", "30", 0],
    ["d", "32", 10],
  ]),
  mcq("aptitude-time", "aptitude", "Time Management", "During a timed test, what is usually the best first pass strategy?", [
    ["a", "Attempt every difficult question first", 1],
    ["b", "Skip all math questions", 0],
    ["c", "Solve quick questions and mark harder ones", 10],
    ["d", "Read the same question repeatedly", 0],
  ]),
  mcq("aptitude-data", "aptitude", "Data Interpretation", "A chart shows sales rising from 100 to 150. What is the increase?", [
    ["a", "25%", 4],
    ["b", "50%", 10],
    ["c", "100%", 0],
    ["d", "150%", 0],
  ]),
  ...sharedSelfRatings("aptitude"),

  mcq("communication-clarity", "communication", "Clarity", "Which sentence is clearest?", [
    ["a", "I maybe can send it sometime later.", 2],
    ["b", "I will send the report by 5 PM today.", 10],
    ["c", "Things will happen when possible.", 0],
    ["d", "It is being considered by me.", 3],
  ]),
  mcq("communication-listening", "communication", "Listening", "What is active listening?", [
    ["a", "Waiting to speak", 1],
    ["b", "Repeating everything word for word", 4],
    ["c", "Understanding, clarifying, and responding thoughtfully", 10],
    ["d", "Interrupting quickly", 0],
  ]),
  mcq("communication-feedback", "communication", "Feedback", "A teammate gives critical feedback. What is the strongest response?", [
    ["a", "Ignore it", 0],
    ["b", "Ask for examples and decide what to improve", 10],
    ["c", "Defend every choice immediately", 1],
    ["d", "Stop working with them", 0],
  ]),
  mcq("communication-structure", "communication", "Structure", "For a short presentation, what structure works best?", [
    ["a", "Problem, key idea, evidence, next step", 10],
    ["b", "Random facts", 0],
    ["c", "Only jokes", 0],
    ["d", "No clear ending", 0],
  ]),
  mcq("communication-writing", "communication", "Writing", "Which email subject is most useful?", [
    ["a", "Hello", 1],
    ["b", "Need update", 3],
    ["c", "Resume review request before Friday interview", 10],
    ["d", "Important", 2],
  ]),
  ...sharedSelfRatings("communication"),

  mcq("career-fit", "career", "Self Awareness", "What should guide your first career-track choice?", [
    ["a", "Only salary screenshots", 2],
    ["b", "Skills, interest, market demand, and learning pace", 10],
    ["c", "A random trend", 0],
    ["d", "A friend's exact path", 2],
  ]),
  mcq("career-portfolio", "career", "Portfolio", "What is the best evidence of entry-level job readiness?", [
    ["a", "Only course completion certificates", 3],
    ["b", "Projects that solve clear problems", 10],
    ["c", "A long bio", 1],
    ["d", "No public work", 0],
  ]),
  mcq("career-network", "career", "Networking", "What makes outreach stronger?", [
    ["a", "A specific, respectful ask", 10],
    ["b", "Mass messages with no context", 0],
    ["c", "Demanding referrals", 0],
    ["d", "Sending only emojis", 0],
  ]),
  mcq("career-learning", "career", "Learning Strategy", "Which plan is best for learning a new career skill?", [
    ["a", "Watch videos endlessly", 2],
    ["b", "Learn basics, build small projects, get feedback", 10],
    ["c", "Wait for perfect motivation", 0],
    ["d", "Switch topics daily", 0],
  ]),
  mcq("career-interview", "career", "Interview Readiness", "What should a student prepare before interviews?", [
    ["a", "Project stories and role-specific basics", 10],
    ["b", "Only a new photo", 0],
    ["c", "Nothing until the day before", 0],
    ["d", "Generic answers only", 2],
  ]),
  ...sharedSelfRatings("career"),
];

export function getQuestionsForGoal(goal: Goal) {
  return questions.filter((question) => question.goal === goal);
}
