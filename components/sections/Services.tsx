import { BarChart3, Map, Route, UserRoundSearch } from "lucide-react";
import { Card } from "@/components/ui/Card";

const services = [
  {
    icon: BarChart3,
    title: "Skill Diagnosis",
    copy: "Quick MCQs and self-ratings reveal your strongest and weakest areas.",
  },
  {
    icon: Route,
    title: "Personalized Roadmap",
    copy: "A focused two-week plan turns your gaps into daily action.",
  },
  {
    icon: Map,
    title: "Progress Tracking",
    copy: "Simple checkpoints help you see what is improving next.",
  },
  {
    icon: UserRoundSearch,
    title: "Career Guidance",
    copy: "Mentor recommendations connect your diagnosis to real feedback.",
  },
];

export function Services() {
  return (
    <section id="services" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-black text-nexora-text">Our Services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-nexora-primary/22 text-nexora-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-black text-nexora-text">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{service.copy}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
