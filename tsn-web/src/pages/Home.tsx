import backgroundVideo from "../assets/global-bg.mp4";
import React, { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Services from "./Services";
import Faq from "./FAQ";
import About from "./About";
import Contact from "./Contact";

type LeadForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const nameRegex = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u; // supports Cyrillic/Latin + spaces + hyphen + apostrophe
const phoneRegex = /^\+?[0-9()\-\s]{7,20}$/;

// ✅ ADDED: phone formatter (US-friendly, but respects +country input)
const formatPhone = (raw: string) => {
  const v = raw.trim();

  // If user starts with +, keep international style (light sanitization only)
  if (v.startsWith("+")) return v.replace(/[^\d+()\-\s]/g, "");

  // US formatting: (XXX) XXX-XXXX
  const digits = v.replace(/\D/g, "").slice(0, 10);
  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 10);

  if (digits.length <= 3) return a;
  if (digits.length <= 6) return `(${a}) ${b}`;
  return `(${a}) ${b}-${c}`;
};

// ✅ ADDED: spinner
function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 animate-spin ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
  );
}

// ✅ ADDED: toast
function Toast({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] w-[340px] max-w-[90vw]">
      <div className="rounded-2xl border border-white/10 bg-[#0b1220]/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="text-white font-bold">{title}</div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition text-xl leading-none"
            aria-label="Close toast"
          >
            ×
          </button>
        </div>
        <div className="px-4 py-4">
          <p className="text-white/80 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="h-1 bg-yellow-400/70 animate-toastbar" />
      </div>
    </div>
  );
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // ✅ ADDED: toast state
  const [toastOpen, setToastOpen] = useState(false);

  const initialValues: LeadForm = useMemo(
    () => ({ firstName: "", lastName: "", phone: "", email: "" }),
    []
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string()
          .trim()
          .required("First name is required.")
          .min(2, "First name must be at least 2 characters.")
          .matches(nameRegex, "First name can only contain letters (no numbers)."),
        lastName: Yup.string()
          .trim()
          .required("Last name is required.")
          .min(2, "Last name must be at least 2 characters.")
          .matches(nameRegex, "Last name can only contain letters (no numbers)."),
        phone: Yup.string()
          .trim()
          .required("Phone number is required.")
          .matches(phoneRegex, "Enter a valid phone number (e.g., +1 832 555 1234)."),
        email: Yup.string()
          .trim()
          .required("Email is required.")
          .email("Enter a valid email address."),
      }),
    []
  );

  const openModal = () => {
    setClosing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setClosing(true);
    window.setTimeout(() => {
      setIsModalOpen(false);
      setClosing(false);
    }, 180);
  };

  // ESC closes modal
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  // lock background scroll when modal open
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  return (
    <>
      {/* HERO SECTION */}
      <section id="home" className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block">We'll Show You How to Land</span>
            <span className="block">Your Dream Job in IT</span>
            <span className="block">in 3-6 months!</span>
          </h1>

          <p className="text-yellow-300 mb-6">
            Please fill out the form below and we will send you an outline detailing exactly
            how we have helped thousands of students.
          </p>

          <button
            onClick={openModal}
            className="px-12 py-4 bg-yellow-600 rounded-full text-white text-xl font-bold hover:scale-110 transition"
          >
            Get Started
          </button>
        </div>

        {/* ✅ PRO MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity ${
                closing ? "opacity-0" : "opacity-100"
              }`}
              onClick={closeModal}
            />

            {/* Card */}
            <div
              className={[
                "relative w-full max-w-xl rounded-3xl border border-white/10",
                "bg-[#0b1220]/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden",
                closing ? "animate-modalOut" : "animate-modalIn",
              ].join(" ")}
            >
              {/* top glow */}
              <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[520px] rounded-full bg-yellow-400/20 blur-3xl" />

              {/* Header */}
              <div className="relative px-6 sm:px-8 pt-7 pb-5 border-b border-white/10">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 text-white/70 hover:text-white transition text-2xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Get your free outline
                </h3>
                <p className="mt-2 text-white/70">
                  Fill out the form and we’ll email you the roadmap (no spam).
                </p>
              </div>

              {/* Form */}
              <div className="relative px-6 sm:px-8 py-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  validateOnBlur
                  validateOnChange
                  onSubmit={async (values, actions) => {
                    // ✅ TODO (future): send to backend/db
                    // await fetch("/api/leads", { method: "POST", body: JSON.stringify(values) })
                    console.log("Lead submitted:", values);

                    actions.setSubmitting(false);
                    actions.resetForm();

                    closeModal();

                    // ✅ ADDED: show toast after submit
                    setToastOpen(true);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                    dirty,
                    submitCount,
                  }) => {
                    const showFormError = submitCount > 0 && !isValid;

                    // ✅ ADDED: phone auto-format on change
                    const onPhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                      const next = formatPhone(e.target.value);
                      handleChange({ target: { name: "phone", value: next } } as any);
                    };

                    return (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Top error banner */}
                        {showFormError && (
                          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200 animate-shake">
                            Please fix the highlighted fields below.
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="First Name"
                            error={touched.firstName ? errors.firstName : undefined}
                          />

                          <Field
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Last Name"
                            error={touched.lastName ? errors.lastName : undefined}
                          />
                        </div>

                        {/* ✅ CHANGED: phone uses onPhoneChange */}
                        <Field
                          label="Phone"
                          name="phone"
                          value={values.phone}
                          onChange={onPhoneChange}
                          onBlur={handleBlur}
                          placeholder="(832) 555-1234"
                          error={touched.phone ? errors.phone : undefined}
                        />

                        <Field
                          label="Email"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="you@example.com"
                          error={touched.email ? errors.email : undefined}
                        />

                        {/* ✅ CHANGED: submit button has spinner */}
                        <button
                          type="submit"
                          disabled={isSubmitting || !(dirty && isValid)}
                          className={[
                            "w-full rounded-2xl py-4 font-bold text-lg",
                            "bg-yellow-500 text-black shadow-lg shadow-yellow-900/20",
                            "hover:bg-yellow-400 transition active:scale-[0.99]",
                            "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-yellow-500",
                            "flex items-center justify-center gap-3",
                          ].join(" ")}
                        >
                          {isSubmitting && <Spinner className="text-black" />}
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>

                        <p className="text-xs text-white/45 text-center">
                          By submitting, you agree to be contacted about TSN programs.
                        </p>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ✅ ADDED: toast render */}
      {toastOpen && (
        <Toast
          title="Thanks! Check your email"
          message="We received your request. If you don’t see it in a few minutes, check your spam/junk folder."
          onClose={() => setToastOpen(false)}
        />
      )}

      {/* ✅ SERVICES COMPONENT: contains <section id="services">... */}
      <Services />

      {/* Resources */}
      {/* <section
        id="resources"
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-4xl">Resources</h2>
      </section> */}

      {/* About */}
    <About/>

      {/* FAQ */}
      <Faq />

      {/* Contact */}
      <Contact/>
    </>
  );
};

function Field(props: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  const { label, name, value, onChange, onBlur, placeholder, type = "text", error } = props;

  return (
    <div>
      <label className="block text-sm font-semibold text-white/85">
        {label} <span className="text-red-400">*</span>
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={[
          "mt-2 w-full rounded-xl px-4 py-3 bg-white/10 text-white",
          "border outline-none transition",
          error
            ? "border-red-400/70 focus:border-red-300 focus:ring-2 focus:ring-red-400/30"
            : "border-white/10 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20",
          "placeholder:text-white/40",
        ].join(" ")}
      />

      {error && <div className="mt-2 text-sm text-red-300">{error}</div>}
    </div>
  );
}

export default Home;