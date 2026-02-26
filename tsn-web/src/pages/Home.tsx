import backgroundVideo from "../assets/global-bg.mp4";
import Services from "../pages/Services";
import { useState } from "react";
import Faq from "./FAQ";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* HERO */}
      <section
        id="home"
        className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
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
            Please fill out the form below and we will send you an outline detailing exactly how we have helped thousands of students.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-4 bg-yellow-600 rounded-full text-white text-xl font-bold hover:scale-110 transition"
          >
            Get Started
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="relative bg-gray-900 rounded-xl p-8 w-full max-w-md">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-4 text-xl"
              >
                ×
              </button>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="firstName" placeholder="First Name" onChange={handleInputChange} className="w-full p-3 bg-gray-700 text-white"/>
                <input name="lastName" placeholder="Last Name" onChange={handleInputChange} className="w-full p-3 bg-gray-700 text-white"/>
                <input name="phone" placeholder="Phone" onChange={handleInputChange} className="w-full p-3 bg-gray-700 text-white"/>
                <input name="email" placeholder="Email" onChange={handleInputChange} className="w-full p-3 bg-gray-700 text-white"/>

                <button className="w-full bg-yellow-600 py-3 rounded-lg">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* ✅ SERVICES COMPONENT: contains <section id="services">... */}
      <Services />

      {/* Resources */}
      <section
        id="resources"
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-4xl">Resources</h2>
      </section>

      {/* About */}
      <section
        id="about"
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-4xl">About Us</h2>
      </section>

      {/* FAQ */}
      <Faq />

      {/* Contact */}
      <section
        id="contact"
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-4xl">Contact Us</h2>
      </section>
    </>
  );
};

export default Home;