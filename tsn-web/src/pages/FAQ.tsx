import React, { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

type FaqItem = {
  q: string;
  a: string;
  icon: React.ReactNode;
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = useMemo(
    () => [
      {
        q: "Do you guarantee a job?",
        a: "Employment depends on performance, interviews, and market conditions. No guarantees.",
        icon: <DescriptionOutlinedIcon className="!text-sky-500" />,
      },
      {
        q: "What salary can I expect?",
        a: "Compensation varies by role, location, and experience. Income is not guaranteed.",
        icon: <PaidOutlinedIcon className="!text-sky-500" />,
      },
      {
        q: "Is prior cybersecurity experience required?",
        a: "Not required — but helpful. We guide you step-by-step from fundamentals to job-ready IAM skills.",
        icon: <VerifiedUserOutlinedIcon className="!text-sky-500" />,
      },
      {
        q: "How long does the program take?",
        a: "Typically 2–6 weeks depending on your pace and weekly availability.",
        icon: <HourglassBottomOutlinedIcon className="!text-sky-500" />,
      },
      {
        q: "Is the training live or recorded?",
        a: "Training is structured and self-paced with guided resources. Delivery may vary by cohort/program updates.",
        icon: <AccessTimeOutlinedIcon className="!text-sky-500" />,
      },
      {
        q: "What is post-hire support?",
        a: "Optional guidance to support your transition into IAM roles (interview prep, resume feedback, and learning path support).",
        icon: <SupportAgentOutlinedIcon className="!text-sky-500" />,
      },
    ],
    []
  );

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative w-full py-16 md:py-20">
      {/* background like screenshot */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50 to-white" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -right-28 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute top-32 -left-28 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-5 md:px-6">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Frequently Asked
          <br />
          Questions (FAQ)
        </h2>

        {/* FAQ list */}
        <div className="mt-10 md:mt-12 space-y-5">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.q}
                className={[
                  "rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-sm",
                  "shadow-[0_10px_35px_rgba(15,23,42,0.06)]",
                  "transition",
                ].join(" ")}
              >
                {/* header row */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl bg-sky-100/80 flex items-center justify-center ring-1 ring-sky-200/60">
                      {item.icon}
                    </div>

                    <div className="text-lg md:text-xl font-bold text-slate-900">
                      {item.q}
                    </div>
                  </div>

                  <div
                    className={[
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      "bg-sky-100/60 ring-1 ring-sky-200/60",
                      "transition-transform duration-300",
                      isOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <AddIcon className="!text-sky-500" />
                  </div>
                </button>

                {/* animated body */}
                <div
                  className={[
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 pt-0">
                      <div className="h-px w-full bg-slate-200/70 mb-4" />
                      <p
                        className={[
                          "text-slate-700 text-base md:text-lg leading-relaxed",
                          "transition-opacity duration-300",
                          isOpen ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 md:mt-14">
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
            Legally Safe Disclaimer
          </h3>

          <p className="mt-4 text-slate-700 leading-relaxed">
            TSN provides training and career support services. We do not guarantee employment,
            specific job titles, interview volume, or compensation levels. Income examples and role
            descriptions are illustrative and not promises. Individual results vary based on
            experience, performance, effort, and market demand.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;