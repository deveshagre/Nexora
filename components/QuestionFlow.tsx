"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getQuestionsForGoal, goalLabels } from "@/data/diagnosis";
import { calculateDiagnosis } from "@/lib/assessment";
import { sessionStore } from "@/lib/session";
import type { AnswerMap, GoalSelection } from "@/types/diagnosis";

export function QuestionFlow() {
  const router = useRouter();
  const [goal, setGoal] = useState<GoalSelection | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const storedGoal = sessionStore.getGoal();
    if (!storedGoal) {
      router.replace("/diagnosis/start");
      return;
    }

    setGoal(storedGoal);
    setAnswers(sessionStore.getAnswers());
  }, [router]);

  const questions = useMemo(() => (goal ? getQuestionsForGoal(goal.goal) : []), [goal]);
  const activeQuestion = questions[activeIndex];
  const answeredCount = questions.filter((question) => answers[question.id] !== undefined).length;
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;
  const canContinue = Boolean(activeQuestion && answers[activeQuestion.id] !== undefined);
  const isLast = activeIndex === questions.length - 1;

  function updateAnswer(value: string | number) {
    if (!activeQuestion) {
      return;
    }

    const nextAnswers = { ...answers, [activeQuestion.id]: value };
    setAnswers(nextAnswers);
    sessionStore.setAnswers(nextAnswers);
  }

  function submitDiagnosis() {
    if (!goal) {
      return;
    }

    const result = calculateDiagnosis(goal, answers);
    sessionStore.setResult(result);
    router.push("/result");
  }

  if (!goal || !activeQuestion) {
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <div className="rounded-xl border border-white/10 bg-nexore-card p-6 text-center shadow-soft">
          <p className="font-black text-nexore-text">Loading diagnosis...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="focus-ring rounded-md text-lg font-black text-nexore-text">
            Nexore
          </Link>
          <span className="rounded-xl border border-white/10 bg-nexore-card px-3 py-2 text-sm font-bold text-nexore-text shadow-sm">
            {goalLabels[goal.goal]}
            {goal.careerTrack ? `: ${goal.careerTrack}` : ""}
          </span>
        </div>

        <section className="pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-nexore-primary">Step 2 of 3</p>
              <h1 className="mt-3 text-4xl font-black text-nexore-text">Diagnosis questions</h1>
            </div>
            <p className="text-sm font-black text-nexore-primary">{progress}% complete</p>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-nexore-accent transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <article className="mt-8 rounded-xl border border-white/10 bg-nexore-card/88 p-6 shadow-soft transition sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-xl bg-nexore-primary/24 px-3 py-2 text-sm font-black text-nexore-text">
                Question {activeIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-bold text-nexore-primary">{activeQuestion.category}</span>
            </div>

            <h2 className="mt-6 text-2xl font-black leading-9 text-nexore-text">{activeQuestion.prompt}</h2>

            {activeQuestion.type === "mcq" ? (
              <div className="mt-6 grid gap-3">
                {activeQuestion.options?.map((option) => {
                  const selected = answers[activeQuestion.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateAnswer(option.id)}
                      className={`focus-ring rounded-xl border px-5 py-4 text-left font-bold ${
                        selected
                          ? "border-nexore-accent bg-nexore-primary/28 text-nexore-text"
                          : "border-white/10 bg-slate-950/24 text-slate-300 hover:-translate-y-0.5 hover:border-nexore-accent/55"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-7">
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => {
                    const selected = answers[activeQuestion.id] === rating;
                    return (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => updateAnswer(rating)}
                        className={`focus-ring aspect-square rounded-xl border text-xl font-black ${
                          selected
                            ? "border-nexore-accent bg-nexore-primary/28 text-nexore-text"
                            : "border-white/10 bg-slate-950/24 text-slate-300 hover:-translate-y-0.5 hover:border-nexore-accent/55"
                        }`}
                        aria-label={`Rate ${rating} out of 5`}
                      >
                        {rating}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex justify-between text-sm font-bold text-slate-400">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            )}
          </article>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
              disabled={activeIndex === 0}
              className="focus-ring rounded-xl border border-white/10 bg-white/8 px-5 py-3 font-black text-nexore-text disabled:cursor-not-allowed disabled:opacity-45"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => (isLast ? submitDiagnosis() : setActiveIndex((index) => index + 1))}
              disabled={!canContinue}
              className="focus-ring rounded-xl bg-nexore-accent px-6 py-3 font-black text-slate-950 shadow-soft hover:-translate-y-0.5 hover:bg-nexore-secondary disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isLast ? "Generate Report" : "Next Question"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
