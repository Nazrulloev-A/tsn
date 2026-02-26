import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Services = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold text-slate-800">
          Our Services
        </h2>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <svg viewBox="0 0 600 420" className="w-full h-auto">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#dbeafe" />
                      <stop offset="1" stopColor="#eff6ff" />
                    </linearGradient>
                  </defs>

                  <rect x="40" y="40" width="520" height="320" rx="22" fill="url(#g1)" />
                  <rect x="95" y="90" width="210" height="145" rx="14" fill="#ffffff" />
                  <rect x="115" y="110" width="170" height="12" rx="6" fill="#c7d2fe" />
                  <rect x="115" y="135" width="120" height="10" rx="5" fill="#bfdbfe" />
                  <rect x="115" y="155" width="150" height="10" rx="5" fill="#bfdbfe" />
                  <path
                    d="M120 205 C160 165, 190 215, 230 180 C260 160, 285 175, 300 150"
                    stroke="#60a5fa"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="120" cy="205" r="7" fill="#3b82f6" />
                  <circle cx="230" cy="180" r="7" fill="#3b82f6" />
                  <circle cx="300" cy="150" r="7" fill="#3b82f6" />

                  <circle cx="390" cy="160" r="30" fill="#93c5fd" />
                  <rect x="352" y="192" width="78" height="100" rx="18" fill="#60a5fa" />
                  <rect x="330" y="212" width="44" height="18" rx="9" fill="#3b82f6" />
                  <rect x="410" y="212" width="44" height="18" rx="9" fill="#3b82f6" />

                  <circle cx="470" cy="110" r="10" fill="#bae6fd" />
                  <circle cx="500" cy="135" r="7" fill="#bfdbfe" />
                  <circle cx="455" cy="310" r="10" fill="#bfdbfe" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                Cybersecurity Training Program
                <span className="block text-slate-500 font-semibold mt-1">
                  (IAM-Focused)
                </span>
              </h3>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Master IAM through our structured, hands-on training program
                built around real-world enterprise use cases. Gain practical
                experience with SailPoint and other leading IAM solutions.
              </p>

              <h4 className="mt-6 text-slate-800 font-bold">
                What You’ll Gain:
              </h4>

              <ul className="mt-3 space-y-3 text-slate-700">
                {[
                  "Strong foundation in IAM & Identity Governance concepts",
                  "Hands-on IAM configuration and administration experience",
                  "Real-world project simulation",
                  "Interview preparation & practical scenario training",
                  "Resume guidance tailored to IAM roles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircleIcon className="!text-emerald-500 mt-0.5" fontSize="small" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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

const IconBadge = ({ bg, fg, text }: { bg: string; fg: string; text: string }) => (
  <div className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center ${fg} font-bold`}>
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