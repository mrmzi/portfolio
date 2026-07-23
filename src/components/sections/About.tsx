import React from "react";
import { HiDownload } from "react-icons/hi";
import { FiCode, FiUsers, FiTrendingUp } from "react-icons/fi";

interface AboutProps {
  cvUrl?: string;
}

const About: React.FC<AboutProps> = ({ cvUrl }) => {
  return (
    <section
      id="about"
      className="relative -mt-20 pt-40 pb-20 sm:pb-24 lg:pb-32 overflow-hidden z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50 to-slate-100 dark:via-gray-900 dark:to-gray-950 -z-10" />

      {/* Pattern with mask (Starts after the overlap) */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 40%)",
          maskImage: "linear-gradient(to bottom, transparent 20%, black 40%)",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-blue-200/50 dark:bg-blue-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-16 left-0 w-96 h-96 bg-violet-200/50 dark:bg-purple-600/10 rounded-full blur-3xl -z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">
            Get to know me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-0.5 bg-blue-300 dark:bg-blue-800 rounded-full" />
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full" />
            <div className="w-8 h-0.5 bg-violet-300 dark:bg-purple-800 rounded-full" />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 sm:p-10 lg:p-12 border border-slate-200/60 dark:border-gray-700/50 shadow-lg shadow-slate-200/50 dark:shadow-none">
          <div className="space-y-7">
            {/* Paragraph 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center">
                <FiCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed pt-1">
                Computer Engineering graduate with a deep passion for frontend
                development, UI design, and building dynamic, responsive web
                applications.
              </p>
            </div>

            <div className="ml-14 h-px bg-slate-200/60 dark:bg-gray-700/50" />

            {/* Paragraph 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed pt-1">
                Experienced in executing independent projects and teamwork, with
                a continuous learning mindset and eagerness to leverage modern
                tools and technologies to enhance quality and user experience.
              </p>
            </div>

            <div className="ml-14 h-px bg-slate-200/60 dark:bg-gray-700/50" />

            {/* Paragraph 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed pt-1">
                Seeking opportunities for professional growth as a Front-end
                Developer and contributing to building efficient, fast, and
                user-friendly products.
              </p>
            </div>
          </div>

          {/* CTA */}
          {cvUrl && (
            <div className="mt-10 flex justify-center">
              <a
                href={cvUrl}
                download
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <HiDownload className="w-5 h-5 group-hover:animate-bounce" />
                Download Resume
              </a>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
          {[
            { value: "2+", label: "Years Experience", color: "blue" },
            { value: "5+", label: "Projects Done", color: "violet" },
            { value: "10+", label: "Technologies", color: "cyan" },
          ].map(({ value, label, color }) => (
            <div
              key={label}
              className={`text-center p-5 sm:p-6 rounded-xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-md border shadow-sm
                ${color === "blue" ? "border-blue-100/50 dark:border-blue-900/40 shadow-blue-100/30 dark:shadow-none" : ""}
                ${color === "violet" ? "border-violet-100/50 dark:border-violet-900/40 shadow-violet-100/30 dark:shadow-none" : ""}
                ${color === "cyan" ? "border-cyan-100/50 dark:border-cyan-900/40 shadow-cyan-100/30 dark:shadow-none" : ""}
              `}
            >
              <div
                className={`text-3xl sm:text-4xl font-bold mb-1.5 bg-clip-text text-transparent bg-gradient-to-br
                  ${color === "blue" ? "from-blue-600 to-blue-400" : ""}
                  ${color === "violet" ? "from-violet-600 to-purple-400" : ""}
                  ${color === "cyan" ? "from-cyan-600 to-teal-400" : ""}
                `}
              >
                {value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
