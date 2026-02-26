import React, { useMemo, useState } from "react";

type Step = 0 | 1 | 2;

type FormState = {
  topic: string;
  firstName: string;
  lastName: string;
  email: string;
  details: string;
};

const Contact = () => {
  const topics = useMemo(
    () => [
      "I want to learn more about TSN",
      "I have a question about my application",
      "I have a question about costs or payment options",
      "I’m interested in volunteering with TSN",
      "I want to partner with TSN",
      "I’m interested in supporting TSN financially",
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormState>({
    topic: "",
    firstName: "",
    lastName: "",
    email: "",
    details: "",
  });

  const reset = () => {
    setStep(0);
    setSubmitted(false);
    setForm({
      topic: "",
      firstName: "",
      lastName: "",
      email: "",
      details: "",
    });
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 250);
  };

  const nextDisabled =
    (step === 0 && !form.topic) ||
    (step === 1 &&
      (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim())) ||
    (step === 2 && !form.details.trim());

  const goNext = () => {
    if (step < 2) setStep((s) => (s + 1) as Step);
  };

  const goPrev = () => {
    if (step > 0) setStep((s) => (s - 1) as Step);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ TODO (future): Send form data to your backend/database here
    // Example:
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })

    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-16 md:py-20">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50 to-white" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -right-28 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute top-28 -left-28 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-5 md:px-6">
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-sm p-8 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
          <p className="text-slate-700 text-lg leading-relaxed max-w-3xl">
            Thank you for your interest in TSN! Use the options below to connect with our
            team, whether you’re a learner, alumni, partner, press, or someone looking to learn more.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-white font-semibold
                       shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/25
                       transition active:scale-[0.99]"
          >
            Get in touch <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={close}
          />

          {/* modal card */}
          <div className="relative w-full max-w-5xl rounded-2xl bg-sky-50 shadow-2xl border border-slate-200 overflow-hidden">
            {/* header */}
            <div className="flex items-start justify-between px-6 md:px-8 pt-6 md:pt-7">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Let’s Get You Connected
              </h2>

              <button
                onClick={close}
                className="text-slate-500 hover:text-slate-900 text-2xl leading-none px-2"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* stepper */}
            <div className="px-6 md:px-8 mt-5">
              <Stepper step={step} />
            </div>

            {/* content */}
            <form onSubmit={handleSubmit} className="px-6 md:px-8 pb-7 md:pb-8 pt-6">
              {!submitted ? (
                <>
                  {step === 0 && (
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                        What is your question?
                      </h3>

                      <p className="mt-3 font-semibold text-slate-800">
                        Thanks for your interest in TSN. Choose from the options below and
                        we’ll connect you with the right person:{" "}
                        <span className="text-red-600">*</span>
                      </p>

                      <div className="mt-5 space-y-4">
                        {topics.map((t) => (
                          <label key={t} className="flex items-center gap-3 text-slate-900">
                            <input
                              type="radio"
                              name="topic"
                              value={t}
                              checked={form.topic === t}
                              onChange={(e) =>
                                setForm((prev) => ({ ...prev, topic: e.target.value }))
                              }
                              className="h-4 w-4 accent-sky-700"
                              required
                            />
                            <span className="text-lg">{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                        Tell us a bit about yourself
                      </h3>

                      <div className="mt-6">
                        <label className="block text-slate-900 font-semibold">
                          Name <span className="text-red-600">*</span>
                        </label>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <input
                              value={form.firstName}
                              onChange={(e) =>
                                setForm((prev) => ({ ...prev, firstName: e.target.value }))
                              }
                              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3
                                         focus:outline-none focus:ring-2 focus:ring-sky-500"
                              placeholder=""
                              required
                            />
                            <div className="mt-2 text-slate-500">First</div>
                            <div className="mt-1 text-slate-500 text-sm">
                              To establish communication with the appropriate person
                            </div>
                          </div>

                          <div>
                            <input
                              value={form.lastName}
                              onChange={(e) =>
                                setForm((prev) => ({ ...prev, lastName: e.target.value }))
                              }
                              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3
                                         focus:outline-none focus:ring-2 focus:ring-sky-500"
                              placeholder=""
                              required
                            />
                            <div className="mt-2 text-slate-500">Last</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 max-w-2xl">
                        <label className="block text-slate-900 font-semibold">
                          Email <span className="text-red-600">*</span>
                        </label>

                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="mt-3 w-full rounded-md border border-slate-300 bg-white px-4 py-3
                                     focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        />

                        <div className="mt-2 text-slate-500 text-sm">
                          To establish communication with the appropriate person
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                        Share more details
                      </h3>

                      <label className="mt-6 block text-slate-900 font-semibold">
                        How can we help? Please share a few details so we can better support you.{" "}
                        <span className="text-red-600">*</span>
                      </label>

                      <textarea
                        value={form.details}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, details: e.target.value }))
                        }
                        className="mt-3 w-full min-h-[160px] rounded-md border border-slate-300 bg-white px-4 py-3
                                   focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  )}

                  {/* footer buttons */}
                  <div className="mt-10 flex items-center gap-4">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={goPrev}
                        className="rounded-md bg-sky-700 px-7 py-3 text-white font-semibold hover:bg-sky-800 transition"
                      >
                        Previous
                      </button>
                    )}

                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={nextDisabled}
                        className={`rounded-md px-10 py-3 text-white font-semibold transition
                          ${nextDisabled ? "bg-sky-300 cursor-not-allowed" : "bg-sky-700 hover:bg-sky-800"}`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={nextDisabled}
                        className={`rounded-md px-10 py-3 text-white font-semibold transition
                          ${nextDisabled ? "bg-sky-300 cursor-not-allowed" : "bg-sky-700 hover:bg-sky-800"}`}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <ThankYou />
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

function Stepper({ step }: { step: Step }) {
  const items = [
    { label: "Your Question", idx: 0 },
    { label: "About You", idx: 1 },
    { label: "Additional Information", idx: 2 },
  ];

  return (
    <div className="relative">
      {/* base line */}
      <div className="h-[2px] w-full bg-slate-200" />

      {/* active line */}
      <div
        className="h-[4px] bg-sky-700 absolute left-0 top-[-1px] transition-all duration-300"
        style={{
          width: step === 0 ? "33.33%" : step === 1 ? "66.66%" : "100%",
        }}
      />

      {/* labels */}
      <div className="mt-5 grid grid-cols-3 text-center text-slate-900">
        {items.map((it) => {
          const active = step === it.idx;
          return (
            <div key={it.label} className="relative">
              {/* little triangle indicator */}
              {active && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-sky-700" />
                </div>
              )}
              <div className={`text-lg ${active ? "font-semibold" : "font-medium"}`}>
                {it.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ThankYou() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-8 md:p-10 shadow-sm">
      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
        Thank you for your time!
      </h3>

      <p className="mt-4 text-slate-700 leading-relaxed">
        A member of our team will reach out soon. If you have any immediate questions,
        feel free to visit our Help Center for more information.
      </p>

      <p className="mt-4 text-sm text-slate-500">
        (This is a demo submission message. We’ll connect this form to a database/API once finalized.)
      </p>
    </div>
  );
}

export default Contact;