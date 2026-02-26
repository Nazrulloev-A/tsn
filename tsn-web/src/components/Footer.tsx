import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#061b34] to-[#020c1b] text-white pt-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">TSN Web</h2>

          <p><span className="font-semibold">E.</span> support@tsnweb.com</p>
          <p><span className="font-semibold">P.</span> 1.800.555.1234</p>

          <div className="pt-4">
            <p>Houston, TX 77079</p>
            <p>United States</p>
          </div>
        </div>

        {/* SOLUTIONS */}
        <div>
          <h3 className="font-bold mb-4">Solutions</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">IAM SailPoint</li>
            <li className="hover:text-white cursor-pointer">Cybersecurity</li>
            <li className="hover:text-white cursor-pointer">QA Automation</li>
            <li className="hover:text-white cursor-pointer">Cloud Engineering</li>
            <li className="hover:text-white cursor-pointer">DevOps Training</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="font-bold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Our Services</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h3 className="font-bold mb-4">Connect With Us</h3>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            <LinkedInIcon fontSize="large" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 mt-12"></div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-300">
        <p>© {new Date().getFullYear()} TSN </p>
        <p className="hover:text-white cursor-pointer">
          Terms of Use | Privacy Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;