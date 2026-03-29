import React, { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ✅ update filename if needed
import iamImage from "../assets/iam-training.jpeg";

const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);

  // zoom state
  const [inView, setInView] = useState(false);

  // text reveal (run once)
  const [reveal, setReveal] = useState(false);

  // reveal once when services section enters view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setReveal(true);
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // image zoom when in view
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

  // helper: staggered pop animation
  const pop = (delaySeconds: number) => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return { className: "", style: undefined as React.CSSProperties | undefined };
    }

    return {
      className: reveal ? "opacity-0 animate-popIn" : "opacity-0",
      style: reveal
        ? ({ animationDelay: `${delaySeconds}s` } as React.CSSProperties)
        : undefined,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-20"
    >
      {/* soft background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-6">
        {/* 0s */}
        <h2
          className={`text-center text-3xl md:text-5xl font-extrabold text-slate-800 ${pop(0).className}`}
          style={pop(0).style}
        >
          Our Services
        </h2>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden">
          {/* ✅ Image on top - full width */}
          <div
            ref={imgWrapRef}
            className={`w-full ${pop(1).className}`}
            style={pop(1).style}
          >
            <div className="relative w-full overflow-hidden">
              <img
                src={iamImage}
                alt="IAM Training Session"
                className={[
                  "block w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover",
                  "transition-transform duration-700 ease-out will-change-transform",
                  inView ? "scale-[1.05]" : "scale-100",
                ].join(" ")}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm text-white backdrop-blur-md ring-1 ring-white/20">
                  <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                  IAM Training
                </div>

                <h4 className="mt-3 text-white text-lg sm:text-xl font-bold leading-snug">
                  Hands-on Identity & Access Management Training
                </h4>

                <p className="mt-1 text-white/85 text-xs sm:text-sm leading-relaxed max-w-md">
                  Learn SailPoint-based IAM skills with guided exercises,
                  real use cases, and interview-ready Q&A.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content Below Image */}
          <div className="p-8 md:p-10">
            {/* 2s */}
            <h3
              className={`text-2xl md:text-3xl font-bold text-slate-800 ${pop(2).className}`}
              style={pop(2).style}
            >
              Cybersecurity Training Program
              <span className="block text-slate-500 font-semibold mt-2">
                (IAM-Focused)
              </span>
            </h3>

            {/* 3s */}
            <div
              className={`mt-4 space-y-4 text-slate-600 leading-relaxed ${pop(3).className}`}
              style={pop(3).style}
            >
              <p>
                Master IAM through our structured, hands-on training program built around real-world enterprise use cases. Gain practical experience with SailPoint and other leading IAM solutions.
              </p>
              <p>
                Break into one of the fastest-growing fields in tech with TNS Tech's job-focused IAM training program. Our hands-on, self-paced curriculum equips you with real-world cybersecurity skills that employers actively seek — helping you move from learner to job-ready professional.
              </p>
              <p>
                No prior cybersecurity experience? No problem. We guide you step-by-step toward becoming an in-demand IAM specialist.
              </p>
              <p>
                At TNS Tech, we are committed to accelerating your success in the cybersecurity industry. Our comprehensive, self-paced Identity and Access Management (IAM) training programs are designed to equip you with in-demand, real-world skills that help you confidently transition into cybersecurity roles.
              </p>
            </div>

            {/* 4s */}
            <h4
              className={`mt-6 text-slate-800 font-bold text-lg ${pop(4).className}`}
              style={pop(4).style}
            >
              What You'll Gain:
            </h4>

            {/* bullets: 5s..9s */}
            <ul className="mt-4 space-y-3 text-slate-700">
              {[
                "Strong foundation in IAM & Identity Governance concepts",
                "Hands-on IAM configuration and administration experience",
                "Real-world project simulation",
                "Interview preparation & practical scenario training",
                "Resume guidance tailored to IAM roles",
              ].map((item, idx) => {
                const delay = 5 + idx; // 1 second per line
                const anim = pop(delay);

                return (
                  <li
                    key={item}
                    className={`flex items-start gap-3 ${anim.className}`}
                    style={anim.style}
                  >
                    <CheckCircleIcon className="!text-emerald-500 mt-1" fontSize="small" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Cards: 10s, 11s, 12s */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-200 p-6 md:p-8 bg-slate-50/40">
            <FeatureCard
              delay={10}
              pop={pop}
              title="Job Placement-Driven Model"
              text="We are outcome focused. We provide structured coaching, mock interviews, and job-ready support."
              icon={<IconBadge bg="bg-emerald-100" fg="text-emerald-700" text="✓" />}
            />
            <FeatureCard
              delay={11}
              pop={pop}
              title="Flexible, Self-Paced Learning"
              text="Learn at your own pace while developing the skills employers actively seek in IAM roles."
              icon={<IconBadge bg="bg-sky-100" fg="text-sky-700" text="⏳" />}
            />
            <FeatureCard
              delay={12}
              pop={pop}
              title="Career Advancement Path"
              text="Roles you may pursue: IAM Administrator, SailPoint Administrator, IAM Analyst, Identity Governance Analyst, Identity Security Consultant."
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
  <div className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center ${fg} font-bold text-xl`}>
    {text}
  </div>
);

const FeatureCard = ({
  title,
  text,
  icon,
  delay,
  pop,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
  delay: number;
  pop: (d: number) => { className: string; style?: React.CSSProperties };
}) => {
  const anim = pop(delay);

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition ${anim.className}`}
      style={anim.style}
    >
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