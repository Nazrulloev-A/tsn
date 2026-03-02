import React from "react";

export default function FlexibleSelfPacedLearning() {
  return (
    <section className="min-h-[calc(100vh-96px)] bg-gradient-to-b from-white via-sky-50 to-white px-6 py-14">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] p-10">
        <div className="text-sm tracking-widest text-slate-500 uppercase">Our Services</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-slate-900">
          Flexible, Self-Paced Learning
        </h1>
        <p className="mt-5 text-slate-700 max-w-3xl leading-relaxed">
          Learn at your own pace while building real IAM skills that employers look for.
        </p>
      </div>
    </section>
  );
}