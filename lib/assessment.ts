import { getQuestionsForGoal, goalLabels } from "@/data/diagnosis";
import type {
  AnswerMap,
  DiagnosisResult,
  GoalSelection,
  Question,
  RoadmapDay,
} from "@/types/diagnosis";

function scoreQuestion(question: Question, answer: string | number | undefined) {
  if (answer === undefined) {
    return 0;
  }

  if (question.type === "rating") {
    return Number(answer) * 2;
  }

  return question.options?.find((option) => option.id === answer)?.score ?? 0;
}

export function calculateDiagnosis(goal: GoalSelection, answers: AnswerMap): DiagnosisResult {
  const selectedQuestions = getQuestionsForGoal(goal.goal);
  const categoryStats = new Map<string, { earned: number; max: number }>();

  const earned = selectedQuestions.reduce((total, question) => {
    const questionScore = scoreQuestion(question, answers[question.id]);
    const current = categoryStats.get(question.category) ?? { earned: 0, max: 0 };
    categoryStats.set(question.category, {
      earned: current.earned + questionScore,
      max: current.max + 10,
    });
    return total + questionScore;
  }, 0);

  const maxScore = selectedQuestions.length * 10;
  const score = Math.round((earned / maxScore) * 100);
  const rankedCategories = Array.from(categoryStats.entries())
    .map(([category, stat]) => ({
      category,
      percent: Math.round((stat.earned / stat.max) * 100),
    }))
    .sort((a, b) => a.percent - b.percent);

  const weakAreas = rankedCategories
    .filter((item) => item.percent < 70)
    .slice(0, 3)
    .map((item) => item.category);

  const strengths = rankedCategories
    .slice()
    .reverse()
    .slice(0, 3)
    .map((item) => strengthCopy(item.category, score));

  const weaknesses = (weakAreas.length ? weakAreas : rankedCategories.slice(0, 2).map((item) => item.category)).map(
    (area) => weaknessCopy(area, goalLabels[goal.goal]),
  );

  return {
    goal,
    score,
    weakAreas,
    strengths,
    weaknesses,
    skillLevel: score >= 75 ? "Advanced" : score >= 45 ? "Intermediate" : "Beginner",
    completedAt: new Date().toISOString(),
  };
}

export function generateRoadmap(result: DiagnosisResult): RoadmapDay[] {
  const mainGap = result.weakAreas[0] ?? "Core Practice";
  const secondGap = result.weakAreas[1] ?? "Applied Practice";
  const goalName = goalLabels[result.goal.goal];

  return [
    {
      day: 1,
      title: `${goalName} baseline reset`,
      task: `Review your result, write the top 2 gaps, and spend 30 minutes revising ${mainGap}.`,
      resource: "https://www.khanacademy.org/",
    },
    {
      day: 2,
      title: `${mainGap} foundations`,
      task: "Learn one core concept, make short notes, and solve 5 beginner-level checks.",
      resource: "https://www.freecodecamp.org/learn/",
    },
    {
      day: 3,
      title: "Guided practice",
      task: `Practice ${mainGap} with a timer. Review every mistake immediately after the session.`,
      resource: "https://www.coursera.org/",
    },
    {
      day: 4,
      title: `${secondGap} drill`,
      task: `Spend 40 minutes on ${secondGap}. Keep an error log with cause and correction.`,
      resource: "https://www.edx.org/",
    },
    {
      day: 5,
      title: "Mixed practice",
      task: "Attempt a mixed set of 10 tasks. Separate speed issues from concept issues.",
      resource: "https://www.geeksforgeeks.org/",
    },
    {
      day: 6,
      title: "Mini project or mock round",
      task: "Apply the skill in one realistic task and write a 5-line reflection afterward.",
      resource: "https://www.notion.so/templates/student-dashboard",
    },
    {
      day: 7,
      title: "Weekly checkpoint",
      task: "Retake 5 questions from your weakest areas and update your practice plan.",
      resource: "https://docs.google.com/",
    },
    {
      day: 8,
      title: "Level-up concept",
      task: `Pick one intermediate ${goalName.toLowerCase()} topic and build a clean example from scratch.`,
      resource: "https://www.youtube.com/education",
    },
    {
      day: 9,
      title: "Speed and accuracy",
      task: "Run a 25-minute focused session. Aim for fewer guesses and clearer reasoning.",
      resource: "https://pomofocus.io/",
    },
    {
      day: 10,
      title: "Feedback loop",
      task: "Ask a peer, teacher, or AI assistant to review one output and identify improvements.",
      resource: "https://chat.openai.com/",
    },
    {
      day: 11,
      title: "Weak-area retest",
      task: `Do a focused retest on ${mainGap}. Repeat missed concepts until you can explain them simply.`,
      resource: "https://quizlet.com/",
    },
    {
      day: 12,
      title: "Portfolio proof",
      task: "Create one small proof of learning: a solved set, recording, write-up, or project note.",
      resource: "https://github.com/",
    },
    {
      day: 13,
      title: "Full simulation",
      task: "Complete a realistic 45-minute session and compare performance against Day 1.",
      resource: "https://www.testgorilla.com/blog/practice-tests/",
    },
    {
      day: 14,
      title: "Next path decision",
      task: "Review progress, choose your next 2 gaps, and schedule the next 14-day sprint.",
      resource: "https://calendar.google.com/",
    },
  ];
}

function strengthCopy(category: string, score: number) {
  if (score >= 75) {
    return `Strong command of ${category} under MVP-level assessment pressure.`;
  }

  if (score >= 45) {
    return `Working foundation in ${category} that can improve quickly with deliberate practice.`;
  }

  return `Early awareness of ${category}; this is enough to start a focused practice loop.`;
}

function weaknessCopy(area: string, goalName: string) {
  return `${area} is limiting your current ${goalName.toLowerCase()} readiness and should be practiced first.`;
}
