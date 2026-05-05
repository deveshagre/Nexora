"use client";

import type { AnswerMap, DiagnosisResult, GoalSelection } from "@/types/diagnosis";

const GOAL_KEY = "nexora.goal";
const ANSWERS_KEY = "nexora.answers";
const RESULT_KEY = "nexora.result";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    window.localStorage.removeItem(key);
    return null;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export const sessionStore = {
  getGoal: () => readJson<GoalSelection>(GOAL_KEY),
  setGoal: (goal: GoalSelection) => writeJson(GOAL_KEY, goal),
  getAnswers: () => readJson<AnswerMap>(ANSWERS_KEY) ?? {},
  setAnswers: (answers: AnswerMap) => writeJson(ANSWERS_KEY, answers),
  getResult: () => readJson<DiagnosisResult>(RESULT_KEY),
  setResult: (result: DiagnosisResult) => writeJson(RESULT_KEY, result),
  clearResult: () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(RESULT_KEY);
  },
};
