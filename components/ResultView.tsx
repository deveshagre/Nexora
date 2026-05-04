"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateRoadmap } from "@/lib/assessment";
import { sessionStore } from "@/lib/session";
import { goalLabels } from "@/data/diagnosis";
import { getMentorCategory, getRecommendedMentors } from "@/data/mentors";
import { MentorCard } from "@/components/mentor/MentorCard";
import type { DiagnosisResult } from "@/types/diagnosis";

export function ResultView() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(true);

  useEffect(() => {
    const storedResult = sessionStore.getResult();
    if (!storedResult) {
      router.replace("/diagnosis/start");
      return;
    }

    setResult(storedResult);
    const timer = window.setTimeout(() => setIsLoadingReport(false), 900);
    return () => window.clearTimeout(timer);
  }, [router]);

  const roadmap = useMemo(() => (result ? generateRoadmap(result) : []), [result]);
  const recommendedMentors = useMemo(() => (result ? getRecommendedMentors(result.goal, 3) : []), [result]);
  const mentorCategory = result ? getMentorCategory(result.goal) : "tech";

  if (!result || isLoadingReport) {
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-nexore-card p-7 text-center shadow-soft">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-nexore-accent" />
          <h1 className="mt-6 text-2xl font-black text-nexore-text">Analyzing your skills...</h1>
          <p className="mt-3 leading-7 text-slate-300">Mapping your score, gaps, roadmap, and best-fit mentors.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="focus-ring rounded-md text-lg font-black text-nexore-text">
            Nexore
          </Link>
          <Link
            href="/diagnosis/start"
            className="focus-ring rounded-xl border border-white/10 bg-white/8 px-4 py-2 text-sm font-black text-nexore-text hover:border-nexore-accent/55 hover:bg-white/12"
          >
            Retake Diagnosis
          </Link>
        </div>

        <section className="pt-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-nexore-primary">Step 3 of 3</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="rounded-xl border border-nexore-accent/24 bg-gradient-to-br from-nexore-card via-nexore-primary/34 to-nexore-accent/20 p-7 text-white shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
                {goalLabels[result.goal.goal]}
                {result.goal.careerTrack ? `: ${result.goal.careerTrack}` : ""}
              </p>
              <h1 className="mt-4 text-4xl font-black sm:text-5xl">Your AI Skill Report</h1>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-950/26 p-5">
                  <p className="text-sm font-bold text-slate-300">Skill score</p>
                  <p className="mt-2 text-6xl font-black">{result.score}</p>
                  <p className="mt-1 text-slate-300">out of 100</p>
                </div>
                <div className="rounded-xl bg-slate-950/26 p-5">
                  <p className="text-sm font-bold text-slate-300">Skill level</p>
                  <p className="mt-3 text-3xl font-black">{result.skillLevel}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{levelMessage(result.skillLevel)}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <ReportList title="Strengths" items={result.strengths} />
              <ReportList title="Weaknesses" items={result.weaknesses} />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-nexore-primary">
                {mentorCategory === "tech" ? "Tech" : "Non-tech"} guidance
              </p>
              <h2 className="mt-3 text-3xl font-black text-nexore-text">Recommended Mentors for You</h2>
            </div>
            <p className="max-w-md text-sm font-semibold leading-6 text-slate-400">
              Book one focused session to turn your weak areas into a clear practice plan.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {recommendedMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                cta={`Fix your gaps with ${mentor.name} ->`}
                compact
              />
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-nexore-primary">Roadmap</p>
              <h2 className="mt-3 text-3xl font-black text-nexore-text">Your next 14 days</h2>
            </div>
            <p className="max-w-md text-sm font-semibold leading-6 text-slate-400">
              Built around your weakest areas first, then moved into proof of practice.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {roadmap.map((day) => (
              <article key={day.day} className="rounded-xl border border-white/10 bg-nexore-card/88 p-5 shadow-soft transition hover:-translate-y-1 hover:border-nexore-accent/45">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-xl bg-nexore-primary/24 px-3 py-2 text-sm font-black text-nexore-text">
                    Day {day.day}
                  </span>
                  <a
                    href={day.resource}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring rounded-md text-sm font-black text-nexore-accent hover:text-nexore-secondary"
                  >
                    Resource
                  </a>
                </div>
                <h3 className="mt-4 text-xl font-black text-nexore-text">{day.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{day.task}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ReportList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-white/10 bg-nexore-card/88 p-6 shadow-soft">
      <h2 className="text-xl font-black text-nexore-text">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <p key={item} className="rounded-xl bg-slate-950/32 p-4 text-sm font-semibold leading-6 text-slate-300">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

function levelMessage(level: DiagnosisResult["skillLevel"]) {
  const messages: Record<DiagnosisResult["skillLevel"], string> = {
    Beginner: "Start with foundations, short practice cycles, and quick feedback.",
    Intermediate: "You have a workable base. Consistency and targeted drills matter most now.",
    Advanced: "You are ready for harder simulations, portfolio proof, and refinement.",
  };

  return messages[level];
}
