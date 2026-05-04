"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { careerTracks, goalLabels } from "@/data/diagnosis";
import { sessionStore } from "@/lib/session";
import type { Goal } from "@/types/diagnosis";

const goals: Goal[] = ["coding", "aptitude", "communication", "career"];

export function GoalSelectionForm() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal>("coding");
  const [careerTrack, setCareerTrack] = useState(careerTracks[0]);

  function continueToQuestions() {
    sessionStore.setGoal({
      goal,
      careerTrack: goal === "career" ? careerTrack : undefined,
    });
    sessionStore.setAnswers({});
    sessionStore.clearResult();
    router.push("/diagnosis/questions");
  }

  return (
    <div className="mt-8 max-w-4xl">
      <div className="grid gap-4 sm:grid-cols-2">
        {goals.map((item) => {
          const isSelected = goal === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setGoal(item)}
              className={`focus-ring rounded-lg border p-5 text-left shadow-soft ${
                isSelected
                  ? "border-nexore-primary bg-nexore-secondary"
                  : "border-white bg-white/84 hover:-translate-y-0.5 hover:border-nexore-accent"
              }`}
            >
              <span className="text-lg font-black text-nexore-dark">{goalLabels[item]}</span>
              <span className="mt-2 block text-sm leading-6 text-nexore-dark/70">
                {goalDescription(item)}
              </span>
            </button>
          );
        })}
      </div>

      {goal === "career" ? (
        <label className="mt-5 block max-w-md">
          <span className="text-sm font-black text-nexore-dark">Career track</span>
          <select
            value={careerTrack}
            onChange={(event) => setCareerTrack(event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border-nexore-secondary bg-white px-4 py-3 font-semibold text-nexore-dark shadow-sm"
          >
            {careerTracks.map((track) => (
              <option key={track}>{track}</option>
            ))}
          </select>
        </label>
      ) : null}

      <button
        type="button"
        onClick={continueToQuestions}
        className="focus-ring mt-8 rounded-md bg-nexore-dark px-6 py-3 font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-nexore-primary"
      >
        Continue to Questions
      </button>
    </div>
  );
}

function goalDescription(goal: Goal) {
  const copy: Record<Goal, string> = {
    coding: "Logic, debugging, data structures, web basics, and practice habits.",
    aptitude: "Quant basics, patterns, data interpretation, speed, and accuracy.",
    communication: "Clarity, listening, feedback, structure, writing, and confidence.",
    career: "Track fit, portfolio readiness, networking, learning strategy, and interviews.",
  };

  return copy[goal];
}
