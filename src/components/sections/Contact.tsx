// src/components/sections/Contact.tsx
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { useTheme } from "../../hook/useTheme";

interface ContactProps {
  email: string;
  linkedin: string;
  github: string;
}

const Contact = ({ email, linkedin, github }: ContactProps) => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    {
      icon: FiMail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      color: "#ef4444",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: linkedin,
      color: "#0077b5",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: "Check my repos",
      href: github,
      color: theme === "dark" ? "#ffffff" : "#181717",
      gradient:
        theme === "dark"
          ? "from-gray-200 to-gray-400"
          : "from-gray-800 to-gray-600",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative min-h-screen py-20 px-6 overflow-hidden ${
        theme === "dark" ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <FiSend className="text-purple-500" />
            <span
              className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Let's Connect
            </span>
          </motion.div>

          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Get In Touch
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            Have a project in mind or just want to chat? I'd love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Contact info & social */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Info cards */}
            <div className="space-y-4">
              <motion.div
                className={`p-6 rounded-2xl backdrop-blur-xl border ${
                  theme === "dark"
                    ? "bg-gray-900/40 border-gray-800"
                    : "bg-white/40 border-gray-200"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <FiMapPin className="text-white" size={20} />
                  </div>
                  <h3
                    className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Location
                  </h3>
                </div>
                <p
                  className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Mashhad, Iran
                </p>
              </motion.div>

              <motion.div
                className={`p-6 rounded-2xl backdrop-blur-xl border ${
                  theme === "dark"
                    ? "bg-gray-900/40 border-gray-800"
                    : "bg-white/40 border-gray-200"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    <FiClock className="text-white" size={20} />
                  </div>
                  <h3
                    className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Response Time
                  </h3>
                </div>
                <p
                  className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Usually within 24 hours
                </p>
              </motion.div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center gap-4 p-5 rounded-2xl backdrop-blur-xl border transition-all ${
                    theme === "dark"
                      ? "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                      : "bg-white/40 border-gray-200 hover:border-gray-300"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                >
                  {/* Glow effect - حذف whileHover و استفاده از group-hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 bg-gradient-to-r ${link.gradient}`}
                  />

                  <div
                    className={`relative p-3 rounded-xl bg-gradient-to-br ${link.gradient} shadow-lg`}
                  >
                    <link.icon className="text-white" size={24} />
                  </div>

                  <div className="flex-1 relative">
                    <h4
                      className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {link.label}
                    </h4>
                    <p
                      className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {link.value}
                    </p>
                  </div>

                  <motion.div
                    className={`${theme === "dark" ? "text-gray-600" : "text-gray-400"} group-hover:text-purple-500 transition-colors`}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className={`relative p-8 rounded-2xl backdrop-blur-xl border ${
                theme === "dark"
                  ? "bg-gray-900/40 border-gray-800"
                  : "bg-white/40 border-gray-200"
              }`}
            >
              {/* Success message overlay */}
              {submitted && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500/90 to-emerald-500/90 rounded-2xl z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="text-center text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/80">I'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transition-all" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />

                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
