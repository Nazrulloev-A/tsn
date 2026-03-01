import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

type Step = 0 | 1 | 2;

type FormState = {
  topic: string;
  firstName: string;
  lastName: string;
  email: string;
  details: string;
};

const nameRegex = /^[\p{L}]+(?:[ \-'\u2019][\p{L}]+)*$/u; // letters only, allows space/hyphen between words
const emailRegex =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // solid basic email validation

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

  // ✅ Formik handles validation + state
  const formik = useFormik<FormState>({
    initialValues: {
      topic: "",
      firstName: "",
      lastName: "",
      email: "",
      details: "",
    },
    validationSchema: Yup.object({
      topic: Yup.string().required("Please select one option to continue."),
      firstName: Yup.string()
        .trim()
        .required("First name is required.")
        .matches(nameRegex, "First name must contain letters only.")
        .min(2, "First name must be at least 2 characters.")
        .max(40, "First name must be 40 characters or less."),
      lastName: Yup.string()
        .trim()
        .required("Last name is required.")
        .matches(nameRegex, "Last name must contain letters only.")
        .min(2, "Last name must be at least 2 characters.")
        .max(40, "Last name must be 40 characters or less."),
      email: Yup.string()
        .trim()
        .required("Email is required.")
        .matches(emailRegex, "Please enter a valid email address.")
        .email("Please enter a valid email address."),
      details: Yup.string()
        .trim()
        .required("Please add a few details before submitting.")
        .min(10, "Please provide at least 10 characters."),
    }),
    onSubmit: async (values) => {
      // ✅ TODO (future): Send form data to your backend/database here
      // Example:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })

      console.log("Contact form submitted:", values);
      setSubmitted(true);
    },
    validateOnBlur: true,
    validateOnChange: false, // professional UX: validate after blur / Next click
  });

  const reset = () => {
    setStep(0);
    setSubmitted(false);
    formik.resetForm();
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 250);
  };

  // ✅ validate current step before moving next
  const validateStep = async (s: Step) => {
    // mark only fields for this step as touched so errors show
    const touchMap: Partial<Record<keyof FormState, boolean>> = {};

    if (s === 0) touchMap.topic = true;
    if (s === 1) {
      touchMap.firstName = true;
      touchMap.lastName = true;
      touchMap.email = true;
    }
    if (s === 2) touchMap.details = true;

    formik.setTouched({ ...formik.touched, ...touchMap }, true);

    const errors = await formik.validateForm();
    if (s === 0) return !errors.topic;
    if (s === 1) return !errors.firstName && !errors.lastName && !errors.email;
    return !errors.details;
  };

  const goNext = async () => {
    const ok = await validateStep(step);
    if (!ok) return;
    if (step < 2) setStep((s) => (s + 1) as Step);
  };

  const goPrev = () => {
    if (step > 0) setStep((s) => (s - 1) as Step);
  };

  // used only for disabling button visuals (actual guard is validateStep)
  const nextDisabled =
    (step === 0 && !formik.values.topic) ||
    (step === 1 &&
      (!formik.values.firstName.trim() ||
        !formik.values.lastName.trim() ||
        !formik.values.email.trim())) ||
    (step === 2 && !formik.values.details.trim());

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
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 text-white font-semibold shadow-lg shadow-yellow-900/20 hover:bg-yellow-600 hover:shadow-xl hover:shadow-yellow-900/25 transition active:scale-[0.99]"
          >
            Get in touch
            <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={close} />

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
            <form onSubmit={formik.handleSubmit} className="px-6 md:px-8 pb-7 md:pb-8 pt-6">
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
                              checked={formik.values.topic === t}
                              onChange={(e) => formik.setFieldValue("topic", e.target.value)}
                              className="h-4 w-4 accent-sky-700"
                            />
                            <span className="text-lg">{t}</span>
                          </label>
                        ))}
                      </div>

                      {/* error */}
                      {formik.touched.topic && formik.errors.topic && (
                        <p className="mt-4 text-sm text-red-600">{formik.errors.topic}</p>
                      )}
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
                            {/* ✅ First Name label */}
                            <label className="block text-sm font-medium text-slate-700">
                              First Name <span className="text-red-600">*</span>
                            </label>

                            <input
                              name="firstName"
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`mt-2 w-full rounded-md border bg-white px-4 py-3
                                focus:outline-none focus:ring-2 focus:ring-sky-500
                                ${
                                  formik.touched.firstName && formik.errors.firstName
                                    ? "border-red-400"
                                    : "border-slate-300"
                                }`}
                              placeholder=""
                              inputMode="text"
                              autoComplete="given-name"
                            />

                            {formik.touched.firstName && formik.errors.firstName && (
                              <p className="mt-2 text-sm text-red-600">{formik.errors.firstName}</p>
                            )}

                            <div className="mt-2 text-slate-500 text-sm">
                              To establish communication with the appropriate person
                            </div>
                          </div>

                          <div>
                            {/* ✅ Last Name label */}
                            <label className="block text-sm font-medium text-slate-700">
                              Last Name <span className="text-red-600">*</span>
                            </label>

                            <input
                              name="lastName"
                              value={formik.values.lastName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`mt-2 w-full rounded-md border bg-white px-4 py-3
                                focus:outline-none focus:ring-2 focus:ring-sky-500
                                ${
                                  formik.touched.lastName && formik.errors.lastName
                                    ? "border-red-400"
                                    : "border-slate-300"
                                }`}
                              placeholder=""
                              inputMode="text"
                              autoComplete="family-name"
                            />

                            {formik.touched.lastName && formik.errors.lastName && (
                              <p className="mt-2 text-sm text-red-600">{formik.errors.lastName}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 max-w-2xl">
                        {/* ✅ Email label */}
                        <label className="block text-slate-900 font-semibold">
                          Email <span className="text-red-600">*</span>
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`mt-3 w-full rounded-md border bg-white px-4 py-3
                            focus:outline-none focus:ring-2 focus:ring-sky-500
                            ${
                              formik.touched.email && formik.errors.email
                                ? "border-red-400"
                                : "border-slate-300"
                            }`}
                          autoComplete="email"
                        />

                        {formik.touched.email && formik.errors.email && (
                          <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                        )}

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
                        name="details"
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-3 w-full min-h-[160px] rounded-md border bg-white px-4 py-3
                          focus:outline-none focus:ring-2 focus:ring-sky-500
                          ${
                            formik.touched.details && formik.errors.details
                              ? "border-red-400"
                              : "border-slate-300"
                          }`}
                      />

                      {formik.touched.details && formik.errors.details && (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.details}</p>
                      )}
                    </div>
                  )}

                  {/* footer buttons */}
                  <div className="mt-10 flex items-center gap-4">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={goPrev}
                        className="rounded-md bg-yellow-500 px-7 py-3 text-black font-semibold hover:bg-yellow-600 transition"
                      >
                        Previous
                      </button>
                    )}

                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={nextDisabled}
                        className={`rounded-md px-10 py-3 text-white font-semibold transition ${
                          nextDisabled
                            ? "bg-yellow-300 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={nextDisabled}
                        className={`rounded-md px-10 py-3 text-white font-semibold transition ${
                          nextDisabled
                            ? "bg-yellow-300 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
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
        className="h-[4px] bg-yellow-400 left-0 top-[-1px] transition-all duration-300"
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