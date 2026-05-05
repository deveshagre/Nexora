import { Logo } from "@/components/Logo";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto max-w-5xl">
        <Logo />
        <section className="pt-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-nexora-primary">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-normal text-nexora-text sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
          {children}
        </section>
      </div>
    </main>
  );
}
