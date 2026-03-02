import React from "react";

export default function CareerAdvancementPath() {
  return (
    <section className="min-h-[calc(100vh-96px)] bg-gradient-to-b from-white via-sky-50 to-white px-6 py-14">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] p-10">
        <div className="text-sm tracking-widest text-slate-500 uppercase">Our Services</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-slate-900">
          Career Advancement Path
        </h1>
        <p className="mt-5 text-slate-700 max-w-3xl leading-relaxed">
          Clear path from learner → job-ready. Roles: IAM Admin, SailPoint Admin, IAM Analyst.
        </p>
      </div>
    </section>
  );
}