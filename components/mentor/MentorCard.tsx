"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Mentor } from "@/data/mentors";

export function MentorCard({
  mentor,
  cta = "Book Session",
  compact = false,
}: {
  mentor: Mentor;
  cta?: string;
  compact?: boolean;
}) {
  return (
    <Card className={`${compact ? "p-4" : "p-5"} min-w-[270px]`}>
      <div className="flex items-start gap-4">
        <Image
          src={mentor.image}
          alt={`${mentor.name} profile`}
          width={64}
          height={64}
          unoptimized
          className="h-16 w-16 rounded-xl border border-white/10 object-cover"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black text-nexore-text">{mentor.name}</h3>
          <p className="mt-1 text-sm font-bold text-nexore-accent">{mentor.role}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-nexore-accent text-nexore-accent" />
              {mentor.rating}
            </span>
            <span>{mentor.sessions} sessions</span>
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-12 text-sm leading-6 text-slate-300">{mentor.description}</p>

      <Button
        type="button"
        onClick={() => window.open(mentor.calendly, "_blank")}
        className="mt-5 w-full"
      >
        {cta}
      </Button>
    </Card>
  );
}
