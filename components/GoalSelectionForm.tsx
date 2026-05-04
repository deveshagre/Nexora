"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { careerTracks, goalLabels } from "@/data/diagnosis";
import type { MentorCategory } from "@/data/mentors";
import { sessionStore } from "@/lib/session";
import type { Goal } from "@/types/diagnosis";

const goals: Goal[] = ["coding", "aptitude", "communication", "career"];

export function GoalSelectionForm() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal>("coding");
  const [careerTrack, setCareerTrack] = useState(careerTracks[0]);
  const [mentorCategory, setMentorCategory] = useState<MentorCategory>("tech");

  function continueToQuestions() {
    sessionStore.setGoal({
      goal,
      careerTrack: goal === "career" ? careerTrack : undefined,
      mentorCategory,
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
              className={`focus-ring rounded-xl border p-5 text-left shadow-soft ${
                isSelected
                  ? "border-nexore-accent bg-nexore-primary/28"
                  : "border-white/10 bg-nexore-card/86 hover:-translate-y-0.5 hover:border-nexore-accent/55"
              }`}
            >
              <span className="text-lg font-black text-nexore-text">{goalLabels[item]}</span>
              <span className="mt-2 block text-sm leading-6 text-slate-300">
                {goalDescription(item)}
              </span>
            </button>
          );
        })}
      </div>

      {goal === "career" ? (
        <label className="mt-5 block max-w-md">
          <span className="text-sm font-black text-nexore-text">Career track</span>
          <select
            value={careerTrack}
            onChange={(event) => setCareerTrack(event.target.value)}
            className="focus-ring mt-2 w-full rounded-xl border-white/10 bg-nexore-card px-4 py-3 font-semibold text-nexore-text shadow-sm"
          >
            {careerTracks.map((track) => (
              <option key={track}>{track}</option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="mt-6 max-w-md">
        <p className="text-sm font-black text-nexore-text">Mentor focus</p>
        <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-slate-950/24 p-1">
          {(["tech", "non-tech"] as MentorCategory[]).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setMentorCategory(category)}
              className={`focus-ring rounded-lg px-4 py-3 text-sm font-black ${
                mentorCategory === category
                  ? "bg-nexore-accent text-slate-950"
                  : "text-slate-300 hover:bg-white/8"
              }`}
            >
              {category === "tech" ? "Tech" : "Non-tech"}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={continueToQuestions}
        className="focus-ring mt-8 rounded-xl bg-nexore-accent px-6 py-3 font-black text-slate-950 shadow-soft hover:-translate-y-0.5 hover:bg-nexore-secondary"
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
