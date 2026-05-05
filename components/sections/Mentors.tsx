import { mentors } from "@/data/mentors";
import { MentorCard } from "@/components/mentor/MentorCard";

export function Mentors() {
  return (
    <section id="mentors" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-nexora-primary">Guidance</p>
            <h2 className="mt-2 text-3xl font-black text-nexora-text">Top Mentors</h2>
          </div>
          <p className="hidden max-w-sm text-sm font-semibold leading-6 text-slate-400 sm:block">
            Book focused sessions after your diagnosis.
          </p>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
}
