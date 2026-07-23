import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiBriefcase, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface ExperienceProps {
  experiences: Experience[];
}

const experiences_data: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Khayyam University",
    period: "Summer 2025",
    description: [
      "Designed and implemented UI components using HTML, CSS, and JavaScript",
      "Worked with React and Next.js on active projects",
      "Collaborated with the development team and contributed to documentation",
      "Analyzed and resolved UI bugs across the codebase",
    ],
  },
  {
    id: 2,
    role: "Junior Frontend Developer",
    company: "Nexim",
    period: "Azar 1404 – Present",
    description: [
      "Implemented new features using React, TypeScript, and Astro",
      "Optimized performance and resolved bugs",
      "Collaborated with backend team on API integration",
      "Delivered tasks aligned with sprint planning",
      "Contributed to UX improvements across the product",
    ],
  },
];

// Animated Curved Beam (Modern Timeline Connector)
const AnimatedArrow = ({ isVisible }: { isVisible: boolean }) => (
  // ارتفاع و فاصله (margin) بیشتر شده تا منحنی به خوبی دیده شود
  <div className="flex flex-col items-center justify-center h-24 relative my-4">
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-full flex flex-col items-center w-12"
        >
          {/* نقطه اتصال بالا */}
          <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] z-10" />

          {/* مسیر منحنی SVG */}
          <svg width="40" height="96" viewBox="0 0 40 96" className="absolute top-0">
            <defs>
              <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#3b82f6" /> {/* آبی */}
                <stop offset="100%" stopColor="#a855f7" /> {/* بنفش */}
              </linearGradient>
            </defs>

            {/* خط پس‌زمینه ثابت (کم‌رنگ) */}
            <path
              d="M 20 0 C 50 30, -10 60, 20 96"
              fill="transparent"
              className="stroke-gray-200 dark:stroke-gray-700/50"
              strokeWidth="2"
            />

            {/* پرتو نور متحرک روی مسیر */}
            <motion.path
              d="M 20 0 C 50 30, -10 60, 20 96"
              fill="transparent"
              stroke="url(#beam-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0.3, 0.3, 0],   // طول پرتو در طول مسیر تغییر می‌کند
                pathOffset: [0, 0, 0.7, 1],     // حرکت از ابتدا به انتهای مسیر
                opacity: [0, 1, 1, 0]           // فید شدن در ابتدا و انتها
              }}
              transition={{
                repeat: Infinity,
                duration: 2,                    // سرعت حرکت پرتو
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* نقطه اتصال پایین با افکت پالس */}
          <div className="absolute bottom-0 flex justify-center items-center">
            <div className="absolute w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] z-10" />
            <motion.div
              className="absolute w-5 h-5 rounded-full border border-purple-400/50 dark:border-purple-500/50"
              animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);



// Single experience card in sidebar
const SidebarCard = ({
  exp,
  index,
  isActive,
  onClick,
}: {
  exp: Experience;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative group ${
      isActive
        ? "bg-white dark:bg-gray-800 shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 border-2 border-blue-500 dark:border-blue-400"
        : "bg-white/60 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800/60 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 }}
  >
    {isActive && (
      <motion.div
        layoutId="activeIndicator"
        className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}

    <div className="flex items-start gap-3">
      <div
        className={`mt-1 p-2 rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-gray-600"
        }`}
      >
        <HiOutlineOfficeBuilding className="text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-sm mb-1 transition-colors ${
            isActive
              ? "text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {exp.company}
        </h3>
        <p
          className={`text-xs transition-colors ${isActive ? "text-gray-600 dark:text-gray-400" : "text-gray-500 dark:text-gray-500"}`}
        >
          {exp.role}
        </p>
      </div>
    </div>

    <div
      className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
      }`}
    >
      {index + 1}
    </div>
  </motion.button>
);

const Experience = ({ experiences = experiences_data }: ExperienceProps) => {
  const [activeId, setActiveId] = useState<number>(experiences[0]?.id);
  const sectionRef = useRef(null);
  const arrowVisible = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeExp = experiences.find((e) => e.id === activeId);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Blobs */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200 dark:border-blue-800 mb-4">
            <FiBriefcase className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Professional Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-3">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Sidebar with arrow */}
          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <div key={exp.id}>
                <SidebarCard
                  exp={exp}
                  index={index}
                  isActive={activeId === exp.id}
                  onClick={() => setActiveId(exp.id)}
                />
                {index < experiences.length - 1 && (
                  <AnimatedArrow isVisible={arrowVisible} />
                )}
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {activeExp && (
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl"
              >
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {activeExp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <HiOutlineOfficeBuilding className="text-lg" />
                        <span className="font-medium">{activeExp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border border-blue-200 dark:border-blue-800">
                      <FiCalendar className="text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {activeExp.period}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Key Responsibilities
                  </h4>
                  {activeExp.description.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-1 p-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0">
                        <FiCheckCircle className="text-white text-sm" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Experience #{activeExp.id}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default Experience;
