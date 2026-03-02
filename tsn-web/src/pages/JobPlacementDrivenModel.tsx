import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const JobPlacementDrivenModel: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="relative px-8 py-10 md:px-12 md:py-12">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Our Services
            </p>

            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold text-slate-900">
              Job Placement-Driven Model
            </h1>

            <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
              We are outcome focused. We provide structured coaching, mock interviews,
              and job-ready support to help you land an IAM job faster.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                title="What you get"
                items={[
                  "Structured coaching and progress checkpoints",
                  "Mock interviews (behavioral + technical)",
                  "Resume + LinkedIn feedback",
                  "Recruiter messaging guidance",
                  "Job-ready projects you can explain",
                ]}
              />
              <Card
                title="How we measure results"
                items={[
                  "Portfolio projects completion",
                  "Interview readiness scores",
                  "Role-based skill checklist",
                  "Confidence + communication improvement",
                  "Consistent application workflow",
                ]}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white px-8 md:px-10 py-8">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400 transition"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3 text-slate-700">
        {items.map((x) => (
          <li key={x} className="flex items-start gap-3">
            <CheckCircleIcon className="!text-emerald-500 mt-1" fontSize="small" />
            <span className="leading-relaxed">{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobPlacementDrivenModel;