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

  // helper: staggered pop animation (if you already use animate-popIn in your tailwind)
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

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Title */}
        <h1
          className={`text-center text-3xl md:text-5xl font-extrabold text-slate-900 ${pop(0).className}`}
          style={pop(0).style}
        >
          About IAM
          <span className="block">Career Path &amp; TSN</span>
        </h1>

        {/* Main Card */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-10">
            {/* ✅ Image Card (hover zoom like Services) */}
            <div className="flex items-center justify-center">
              <div
                ref={imgWrapRef}
                className={`w-full max-w-xl group ${pop(1).className}`}
                style={pop(1).style}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 bg-white">
                  <img
                    src={aboutPhoto}
                    alt="About IAM Career Path & TSN"
                    className={[
                      "block w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover",
                      "transition-transform duration-700 ease-out will-change-transform",
                      inView ? "scale-[1.05]" : "scale-100",
                      "group-hover:scale-[1.12]",
                    ].join(" ")}
                  />

                  {/* soft overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />

                  {/* overlay text badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm text-white backdrop-blur-md ring-1 ring-white/20">
                      <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                      TSN • IAM Career Path • Since 2011
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
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
              <h2
                className={`text-xl md:text-2xl font-bold text-slate-900 ${pop(2).className}`}
                style={pop(2).style}
              >
                About IAM Career Path &amp; TSN
              </h2>

              <p
                className={`mt-4 text-slate-700 leading-relaxed ${pop(3).className}`}
                style={pop(3).style}
              >
                IAM Career Path, founded by TSN IT Service Provider in 2011, is dedicated to
                helping individuals confidently transition into IT careers. For over{" "}
                <span className="font-semibold text-slate-900">13 years</span>, we have provided
                practical, accelerated, hands-on training for a wide range of learners.
              </p>

              <p
                className={`mt-4 text-slate-700 leading-relaxed ${pop(4).className}`}
                style={pop(4).style}
              >
                Our focus is Identity &amp; Access Management (IAM) — one of the most in-demand
                areas in cybersecurity — with job-ready guidance that helps you go from learner
                to confident professional.
              </p>
            </div>
          </div>

          {/* Bottom two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-200 bg-white/70 px-8 md:px-10 py-8 rounded-b-2xl">
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
                "Measurable results over certifications",
              ]}
              pop={pop}
              delayStart={10}
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