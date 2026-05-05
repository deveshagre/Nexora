import { PageShell } from "@/components/PageShell";
import { GoalSelectionForm } from "@/components/GoalSelectionForm";

export default function StartDiagnosisPage() {
  return (
    <PageShell
      eyebrow="Step 1 of 3"
      title="Choose the goal you want to diagnose today."
      description="Keep the scope tight. Nexora will tailor the questions and roadmap around this one focus area."
    >
      <GoalSelectionForm />
    </PageShell>
  );
}
