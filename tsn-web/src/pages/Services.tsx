import React, { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import iamImage from "../assets/iam-training.jpeg";

const Services = () => {
  // ✅ scroll-zoom state (in-view)
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = imgWrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="relative w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-20"
    >
      {/* soft background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold text-slate-800">
          Our Services
        </h2>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-10">
            {/* ✅ Image card (scroll zoom + hover zoom + overlay text) */}
            <div className="flex items-center justify-center">
              <div ref={imgWrapRef} className="w-full max-w-xl group">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 bg-white">
                  {/* Full-bleed image */}
                  <img
                    src={iamImage}
                    alt="IAM Training Session"
                    className={[
                      "block w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover",
                      "transition-transform duration-700 ease-out will-change-transform",
                      // subtle zoom when section is in view
                      inView ? "scale-[1.05]" : "scale-100",
                      // zoom a bit more on hover
                      "group-hover:scale-[1.12]",
                    ].join(" ")}
                  />

                  {/* Soft overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Soft glow accent */}
                  <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-yellow-300/25 blur-3xl" />

                  {/* Overlay text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm text-white backdrop-blur-md ring-1 ring-white/20">
                      <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                      IAM Training • Real-world Labs
                    </div>

                    <h4 className="mt-3 text-white text-lg sm:text-xl font-bold leading-snug">
                      Hands-on Identity & Access Management Training
                    </h4>

                    <p className="mt-1 text-white/85 text-xs sm:text-sm leading-relaxed max-w-md">
                      Learn SailPoint-based IAM skills with guided exercises,
                      real use cases, and interview-ready projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                Cybersecurity Training Program
                <span className="block text-slate-500 font-semibold mt-2">
                  (IAM-Focused)
                </span>
              </h3>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Master IAM through our structured, hands-on training program
                built around real-world enterprise use cases. Gain practical
                experience with SailPoint and other leading IAM solutions.
              </p>

              <h4 className="mt-6 text-slate-800 font-bold text-lg">
                What You’ll Gain:
              </h4>

              <ul className="mt-4 space-y-3 text-slate-700">
                {[
                  "Strong foundation in IAM & Identity Governance concepts",
                  "Hands-on IAM configuration and administration experience",
                  "Real-world project simulation",
                  "Interview preparation & practical scenario training",
                  "Resume guidance tailored to IAM roles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon
                      className="!text-emerald-500 mt-1"
                      fontSize="small"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-200 p-6 md:p-8 bg-slate-50/40 rounded-b-2xl">
            <FeatureCard
              title="Job Placement-Driven Model"
              text="We are outcome focused. We provide structured coaching, mock interviews, and job-ready support."
              icon={<IconBadge bg="bg-emerald-100" fg="text-emerald-700" text="✓" />}
            />
            <FeatureCard
              title="Flexible, Self-Paced Learning"
              text="Learn at your own pace while developing the skills employers actively seek in IAM roles."
              icon={<IconBadge bg="bg-sky-100" fg="text-sky-700" text="⏳" />}
            />
            <FeatureCard
              title="Career Advancement Path"
              text="Roles you may pursue: IAM Administrator, SailPoint Administrator, IAM Analyst."
              icon={<IconBadge bg="bg-indigo-100" fg="text-indigo-700" text="↑" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const IconBadge = ({
  bg,
  fg,
  text,
}: {
  bg: string;
  fg: string;
  text: string;
}) => (
  <div
    className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center ${fg} font-bold`}
  >
    {text}
  </div>
);

const FeatureCard = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        {icon}
        <div>
          <h5 className="font-bold text-slate-800">{title}</h5>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Services;