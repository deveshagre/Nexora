import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const steps = [
  {
    label: "Choose a goal",
    copy: "Pick the skill direction that matters right now: coding, aptitude, communication, or a career track.",
  },
  {
    label: "Diagnose gaps",
    copy: "Answer a short blend of MCQs and self-ratings built to reveal your current readiness.",
  },
  {
    label: "Follow a roadmap",
    copy: "Get a direct skill report and a two-week plan that turns gaps into daily practice.",
  },
];

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 pb-16 pt-16 sm:pt-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-nexore-primary">Free AI diagnosis</p>
              <h1 className="mt-4 text-6xl font-black tracking-normal text-nexore-dark sm:text-7xl">Nexore</h1>
              <p className="mt-5 max-w-xl text-2xl font-bold leading-9 text-nexore-dark">
                Know your gaps. Own your path.
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-nexore-dark/72">
                Get a fast student-focused diagnosis, see your strongest and weakest areas, and leave with a
                practical two-week roadmap in under three minutes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/diagnosis/start"
                  className="focus-ring rounded-md bg-nexore-dark px-6 py-3 text-center text-base font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-nexore-primary"
                >
                  Start Diagnosis
                </Link>
                <a
                  href="#how-it-works"
                  className="focus-ring rounded-md border border-nexore-primary/25 bg-white/80 px-6 py-3 text-center text-base font-bold text-nexore-dark hover:-translate-y-0.5 hover:border-nexore-accent hover:bg-white"
                >
                  How it works
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-white/80 bg-white/76 p-5 shadow-soft backdrop-blur">
              <div className="rounded-lg bg-gradient-to-br from-nexore-secondary via-white to-nexore-accent/45 p-5">
                <div className="rounded-lg border border-white/80 bg-white/82 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-nexore-primary">Skill score</p>
                      <p className="mt-1 text-5xl font-black text-nexore-dark">68</p>
                    </div>
                    <span className="rounded-md bg-nexore-secondary px-3 py-2 text-sm font-bold text-nexore-dark">
                      Intermediate
                    </span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {["Problem Solving", "Consistency", "Portfolio Proof"].map((item, index) => (
                      <div key={item}>
                        <div className="mb-2 flex items-center justify-between text-sm font-bold text-nexore-dark">
                          <span>{item}</span>
                          <span>{[74, 58, 42][index]}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-nexore-secondary/70">
                          <div
                            className="h-2 rounded-full bg-nexore-primary"
                            style={{ width: `${[74, 58, 42][index]}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-white/80 bg-white/58 px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black text-nexore-dark">How it works</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.label} className="rounded-lg border border-nexore-secondary/70 bg-white p-6 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-nexore-secondary font-black text-nexore-dark">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-black text-nexore-dark">{step.label}</h3>
                  <p className="mt-3 leading-7 text-nexore-dark/72">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <h2 className="text-3xl font-black text-nexore-dark">Why Nexore</h2>
            <div className="rounded-lg border border-nexore-secondary bg-white/82 p-6 shadow-soft">
              <p className="text-lg leading-8 text-nexore-dark/76">
                Students often practice more without knowing what is actually holding them back. Nexore makes the
                first step sharper: choose one goal, diagnose your gaps, then follow a roadmap that converts direction
                into daily action.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto max-w-6xl rounded-lg bg-gradient-to-r from-nexore-dark via-nexore-primary to-nexore-accent p-7 text-white shadow-soft sm:p-10">
            <h2 className="text-3xl font-black">Get your roadmap in minutes.</h2>
            <p className="mt-3 max-w-2xl text-white/86">
              A focused diagnosis today gives you a better practice plan tomorrow.
            </p>
            <Link
              href="/diagnosis/start"
              className="focus-ring mt-6 inline-flex rounded-md bg-white px-6 py-3 font-black text-nexore-dark hover:-translate-y-0.5 hover:bg-nexore-secondary"
            >
              Start Diagnosis
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
