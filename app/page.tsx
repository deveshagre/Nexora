import Link from "next/link";
import { BarChart3, CalendarCheck, ClipboardCheck, Map, Search, UserRoundSearch } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Services } from "@/components/sections/Services";
import { Mentors } from "@/components/sections/Mentors";

const quickActions = [
  {
    icon: ClipboardCheck,
    label: "Start Diagnosis",
    href: "/diagnosis/start",
  },
  {
    icon: BarChart3,
    label: "View Report",
    href: "/result",
  },
  {
    icon: Map,
    label: "Get Roadmap",
    href: "/result",
  },
  {
    icon: UserRoundSearch,
    label: "Find Mentor",
    href: "#mentors",
  },
];

const problems = ["Random learning", "No direction", "No feedback"];

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 pb-10 pt-14 sm:pb-14 sm:pt-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-nexora-primary">AI skill diagnosis</p>
              <h1 className="mt-4 text-6xl font-black tracking-normal text-nexora-text sm:text-7xl">Nexora</h1>
              <p className="mt-5 max-w-xl text-2xl font-black leading-9 text-slate-200">
                Know your gaps. Own your path.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Diagnose your current skill level, get a two-week roadmap, then book the right mentor to fix the gaps
                that matter most.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/diagnosis/start"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-nexora-accent px-6 py-3 text-base font-black text-slate-950 shadow-soft hover:-translate-y-0.5 hover:bg-nexora-secondary"
                >
                  Start Free Diagnosis
                  <Search className="h-5 w-5" />
                </Link>
                <a
                  href="#mentors"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/8 px-6 py-3 text-base font-black text-nexora-text hover:-translate-y-0.5 hover:border-nexora-accent/55 hover:bg-white/12"
                >
                  Explore Mentors
                  <CalendarCheck className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Card className="p-5">
              <div className="rounded-xl bg-gradient-to-br from-nexora-primary/28 via-nexora-card to-nexora-accent/18 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-300">Diagnosis preview</p>
                    <p className="mt-2 text-5xl font-black text-nexora-text">68</p>
                  </div>
                  <span className="rounded-xl bg-nexora-accent px-3 py-2 text-sm font-black text-slate-950">
                    Intermediate
                  </span>
                </div>
                <div className="mt-7 space-y-4">
                  {["Problem Solving", "Practice Consistency", "Mentor Feedback"].map((item, index) => (
                    <div key={item}>
                      <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-300">
                        <span>{item}</span>
                        <span>{[74, 58, 42][index]}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-700">
                        <div
                          className="h-2 rounded-full bg-nexora-accent"
                          style={{ width: `${[74, 58, 42][index]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="px-5 py-8">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href} className="focus-ring rounded-xl">
                  <Card className="h-full p-4 text-center">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-nexora-primary/22 text-nexora-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="mt-3 text-sm font-black text-nexora-text">{action.label}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <Services />
        <Mentors />

        <section className="px-5 py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-nexora-primary">Why Nexora</p>
              <h2 className="mt-2 text-3xl font-black text-nexora-text">Stop practicing without a signal.</h2>
            </div>
            <Card className="p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {problems.map((problem) => (
                  <div key={problem} className="rounded-xl bg-slate-950/32 p-4">
                    <p className="text-sm font-black text-nexora-text">{problem}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-300">
                Nexora solves this with structured diagnosis, a clear roadmap, and mentor recommendations built around
                your gaps.
              </p>
            </Card>
          </div>
        </section>

        <section className="px-5 pb-20 pt-6">
          <div className="mx-auto max-w-6xl rounded-xl border border-nexora-accent/30 bg-gradient-to-r from-nexora-card via-nexora-primary/28 to-nexora-accent/20 p-7 shadow-soft sm:p-10">
            <h2 className="text-3xl font-black text-nexora-text">Stop guessing. Start knowing.</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Start with a free diagnosis and leave with a focused plan in minutes.
            </p>
            <Link
              href="/diagnosis/start"
              className="focus-ring mt-6 inline-flex rounded-xl bg-nexora-accent px-6 py-3 font-black text-slate-950 hover:-translate-y-0.5 hover:bg-nexora-secondary"
            >
              Start Diagnosis
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
