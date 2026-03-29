import React, { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ✅ Update filename if needed
import aboutPhoto from "../assets/About US page.png";

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);

  // zoom state (in-view)
  const [inView, setInView] = useState(false);

  // optional text reveal (run once)
  const [reveal, setReveal] = useState(false);

  // reveal once when About section enters view
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
      id="about"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white py-16 md:py-20"
    >
      {/* Soft background blobs + subtle circuit pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-blue-200/25 blur-3xl" />

        {/* light circuit lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
        >
          <g fill="none" stroke="#60a5fa" strokeWidth="1">
            <path d="M90 120 H260 V200 H430" />
            <circle cx="90" cy="120" r="4" fill="#60a5fa" />
            <circle cx="260" cy="200" r="4" fill="#60a5fa" />
            <circle cx="430" cy="200" r="4" fill="#60a5fa" />

            <path d="M1020 140 H900 V220 H760" />
            <circle cx="1020" cy="140" r="4" fill="#60a5fa" />
            <circle cx="900" cy="220" r="4" fill="#60a5fa" />
            <circle cx="760" cy="220" r="4" fill="#60a5fa" />

            <path d="M160 520 H300 V460 H450" />
            <circle cx="160" cy="520" r="4" fill="#60a5fa" />
            <circle cx="300" cy="460" r="4" fill="#60a5fa" />
            <circle cx="450" cy="460" r="4" fill="#60a5fa" />

            <path d="M1040 520 H900 V460 H760" />
            <circle cx="1040" cy="520" r="4" fill="#60a5fa" />
            <circle cx="900" cy="460" r="4" fill="#60a5fa" />
            <circle cx="760" cy="460" r="4" fill="#60a5fa" />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-6">
        {/* Title */}
        <h1
          className={`text-center text-3xl md:text-5xl font-extrabold text-slate-900 ${pop(0).className}`}
          style={pop(0).style}
        >
          About IAM
          <span className="block">Career Path &amp; TSN</span>
        </h1>

        {/* Main Card */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-[0_14px_40px_rgba(15,23,42,0.08)] overflow-hidden">
          {/* ✅ Image on top - full width */}
          <div
            ref={imgWrapRef}
            className={`w-full ${pop(1).className}`}
            style={pop(1).style}
          >
            <div className="relative w-full overflow-hidden">
              <img
                src={aboutPhoto}
                alt="About IAM Career Path & TSN"
                className={[
                  "block w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover",
                  "transition-transform duration-700 ease-out will-change-transform",
                  inView ? "scale-[1.05]" : "scale-100",
                ].join(" ")}
              />

              {/* soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              
              {/* overlay text badge */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm text-white backdrop-blur-md ring-1 ring-white/20">
                  <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                  TSN • IAM Career Path
                </div>

                <h4 className="mt-3 text-white text-lg sm:text-xl font-bold leading-snug">
                  Practical, Accelerated, Hands-on Training
                </h4>

                <p className="mt-1 text-white/85 text-xs sm:text-sm leading-relaxed max-w-md">
                  Job-ready guidance to help learners transition confidently into IT careers.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content Below Image */}
          <div className="p-8 md:p-10">
            <h2
              className={`text-xl md:text-2xl font-bold text-slate-900 ${pop(2).className}`}
              style={pop(2).style}
            >
              About IAM Career Path &amp; TSN
            </h2>

            <div
              className={`mt-4 space-y-4 text-slate-700 leading-relaxed ${pop(3).className}`}
              style={pop(3).style}
            >
              <p>
                IAM Career Path, founded by TNS Tech in 2025, was built with a clear purpose: to help motivated individuals launch meaningful careers in IT and cybersecurity. We specialize in Identity & Access Management (IAM) — a critical, high-growth field where skilled professionals are in greater demand than ever. But we don't just teach concepts. We focus on real-world, job-ready skills that prepare you to step confidently into roles that matter.
              </p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Why We Started</h3>
                <p>
                  We saw too many talented people held back by training that was either too theoretical, too slow, or disconnected from what employers actually need. So we created a better way — one rooted in hands-on learning, practical tools, and career-focused support.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">What We Believe</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="!text-green-500 mt-0.5" fontSize="small" />
                    <span><strong className="font-semibold">Learning should be practical.</strong> You gain experience with industry-standard tools like SailPoint, working through real-world scenarios you'll encounter on the job.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="!text-green-500 mt-0.5" fontSize="small" />
                    <span><strong className="font-semibold">Support shouldn't stop at training.</strong> From interview preparation to resume guidance, we help you navigate the hiring process with clarity and confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="!text-green-500 mt-0.5" fontSize="small" />
                    <span><strong className="font-semibold">Your background doesn't define your future.</strong> No prior cybersecurity experience? No problem. We meet you where you are and guide you step by step.</span>
                  </li>
                </ul>
              </div>

              <p className="mt-6 pt-2 border-t border-slate-100 italic text-slate-600">
                Our goal is simple: to help you go from learner to confident, job-ready professional — as quickly and effectively as possible.
              </p>
            </div>

            <p
              className={`mt-6 text-slate-700 leading-relaxed ${pop(4).className}`}
              style={pop(4).style}
            >
              Our focus is Identity &amp; Access Management (IAM) — one of the most in-demand
              areas in cybersecurity — with job-ready guidance that helps you go from learner
              to confident professional.
            </p>
          </div>

          {/* Bottom two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-200 bg-white/70 px-8 md:px-10 py-8">
            <InfoCard
              title="Our Mission:"
              items={[
                "Remove barriers to entry",
                "Simplify complex IT concepts",
                "Deliver structured, job-relevant learning",
                "Keep career goals in focus",
              ]}
              pop={pop}
              delayStart={5}
            />
            <InfoCard
              title="Our Approach:"
              items={[
                "Hands-on, industry-relevant training",
                "Interview and recruiter preparation",
                "Career-focused guidance",
              ]}
              pop={pop}
              delayStart={6}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

function InfoCard({
  title,
  items,
  pop,
  delayStart,
}: {
  title: string;
  items: string[];
  pop: (d: number) => { className: string; style?: React.CSSProperties };
  delayStart: number;
}) {
  const headerAnim = pop(delayStart);

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${headerAnim.className}`} style={headerAnim.style}>
      <h3 className="text-lg md:text-xl font-extrabold text-slate-900">{title}</h3>

      <ul className="mt-4 space-y-3 text-slate-700">
        {items.map((item, idx) => {
          const anim = pop(delayStart + 1 + idx);
          return (
            <li key={item} className={`flex items-start gap-2 ${anim.className}`} style={anim.style}>
              <CheckCircleIcon className="!text-green-500" fontSize="small" />
              <span className="leading-relaxed">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default About;