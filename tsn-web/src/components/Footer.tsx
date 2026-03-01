// src/components/Footer.tsx
import React from "react";
import { scrollToSection, type SectionKey } from "../utils/scrollToSection";

const Footer: React.FC = () => {
  const links: Array<{ label: string; id: SectionKey }> = [
    { label: "Our Services", id: "services" },
    { label: "About Us", id: "about" },
    { label: "FAQ", id: "faq" },
    { label: "Contact Us", id: "contact" },
  ];

  return (
    <footer className="w-full bg-[#071A2B] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <h3 className="text-2xl font-bold">TSN Web</h3>
            <div className="mt-6 space-y-4 text-white/80">
              <div>
                <span className="font-semibold text-white">E.</span>{" "}
                support@tsnweb.com
              </div>
              <div>
                <span className="font-semibold text-white">P.</span>{" "}
                1.800.555.1234
              </div>
              <div className="pt-2">
                Houston, TX 77079
                <br />
                United States
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold">Solutions</h4>
            <ul className="mt-5 space-y-3 text-white/80">
              <li>IAM SailPoint</li>
              <li>Cybersecurity</li>
              {/* <li>QA Automation</li>
              <li>Cloud Engineering</li>
              <li>DevOps Training</li> */}
            </ul>
          </div>

          {/* ✅ Column 3 (UPDATED: clickable footer nav links) */}
          <div>
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(l.id)}
                    className="text-white/85 hover:text-yellow-400 transition"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="mt-6">
              {/* your LinkedIn icon stays here */}
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
          © {new Date().getFullYear()} TSN Web. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;