// src/components/sections/Projects.tsx
import { useState, useEffect, useCallback } from "react";
import { motion, type Transition } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiCode,
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useTheme } from "../../hook/useTheme";

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string | null;
  tags: string[];
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  gradient: string;
  accentColor: string;
}

interface ProjectsProps {
  projects: Project[];
}

const ProjectCard = ({
  project,
  isActive,
  onFlip,
}: {
  project: Project;
  isActive: boolean;
  onFlip: (isFlipped: boolean) => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prevIsActive, setPrevIsActive] = useState(isActive);
  const { theme } = useTheme();

  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive);
    if (!isActive && isFlipped) {
      setIsFlipped(false);
      onFlip(false);
    }
  }

  const handleFlip = (state: boolean) => {
    setIsFlipped(state);
    onFlip(state);
  };

  const flipTransition: Transition = {
    duration: 0.6,
    type: "spring",
    stiffness: 200,
    damping: 20,
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto h-[480px]"
      style={{ perspective: 1500 }}
    >
      {/* ================= روی کارت (Front) ================= */}
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={flipTransition}
        className={`absolute inset-0 rounded-3xl overflow-hidden border flex flex-col shadow-lg transition-colors ${
          theme === "dark"
            ? "bg-gray-900/80 border-gray-700/50 backdrop-blur-xl"
            : "bg-white/90 border-gray-200/80 backdrop-blur-xl"
        }`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="relative h-56 w-full shrink-0 overflow-hidden">
          <motion.img
            src={project.image || ""}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={
              isActive
                ? {
                    scale: [1, 1.15, 1],
                    x: ["0%", "-2%", "2%", "0%"],
                    y: ["0%", "2%", "-1%", "0%"],
                  }
                : {
                    scale: 1,
                    x: "0%",
                    y: "0%",
                  }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2 z-10">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md ${theme === "dark" ? "bg-black/50 text-gray-200" : "bg-white/80 text-gray-800"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3
            className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {project.title}
          </h3>
          <p
            className={`text-sm mb-6 flex-1 line-clamp-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            {project.shortDesc}
          </p>
          <div className="flex gap-2 mb-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                    : "bg-white border-gray-300 hover:bg-gray-50 text-gray-900"
                }`}
              >
                <FiGithub size={16} /> Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`flex-1 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-md`}
              >
                <FiExternalLink size={16} /> Preview
              </a>
            )}
          </div>

          <button
            onClick={() => handleFlip(true)}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              theme === "dark"
                ? "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20"
                : "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100"
            }`}
          >
            Show Details
          </button>
        </div>
      </motion.div>

      {/* ================= پشت کارت (Back) ================= */}
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={flipTransition}
        className={`absolute inset-0 rounded-3xl overflow-hidden border flex flex-col p-6 shadow-xl ${
          theme === "dark"
            ? "bg-gray-800/95 border-gray-600/50 backdrop-blur-xl"
            : "bg-gray-50/95 border-gray-300/50 backdrop-blur-xl"
        }`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-500/20">
          <h3
            className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {project.title}
          </h3>
          <button
            onClick={() => handleFlip(false)}
            className={`p-2 rounded-full transition-colors ${theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"}`}
          >
            <FiArrowLeft size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center">
              <FiCode
                className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
                size={14}
              />
            </div>
            <span
              className={`text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
            >
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1.5 rounded-md text-xs font-medium border ${theme === "dark" ? "bg-gray-900/50 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}
              >
                {tech}
              </span>
            ))}
          </div>
          <p
            className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            {project.fullDesc}
          </p>
        </div>

        <div className="mt-4 pt-4 flex gap-3 border-t border-gray-500/20 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 border ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700 hover:bg-gray-700 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100 text-gray-900"
              }`}
            >
              <FiGithub size={16} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-md shadow-blue-500/30`}
            >
              <FiExternalLink size={16} /> Preview
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Projects = ({ projects }: ProjectsProps) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const AUTOPLAY_DELAY = 5000;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const shouldPause = isHoveredOrTouched || isCardFlipped;

  useEffect(() => {
    if (shouldPause) return;
    const timer = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [shouldPause, nextSlide]);

  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="min-h-screen py-20 sm:py-24 lg:py-32 relative overflow-hidden flex flex-col justify-center"
    >
      {/* ================= پس‌زمینه خاص و داینامیک ================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* رنگ پایه */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${theme === "dark" ? "bg-[#050b14]" : "bg-slate-50"}`}
        />

        {/* پترن شبکه‌ای نقطه‌ای (Dot Grid) */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(${theme === "dark" ? "#ffffff" : "#0f172a"} 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* هاله‌های نوری متحرک (Aurora Orbs) */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-lighten"
        />

        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/20 dark:bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-lighten"
        />

        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] bg-indigo-400/10 dark:bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen dark:mix-blend-lighten"
        />

        {/* وینیِت (Vignette) برای محو کردن لبه‌ها */}
        <div
          className={`absolute inset-0 ${theme === "dark" ? "bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,11,20,0.8)_100%)]" : "bg-[radial-gradient(circle_at_center,transparent_20%,rgba(248,250,252,0.8)_100%)]"}`}
        />
      </div>
      {/* ======================================================== */}

      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8">
        {/* هدر */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 relative inline-block">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
              Projects
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-0.5 bg-blue-300 dark:bg-blue-800 rounded-full" />
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.4)]" />
            <div className="w-8 h-0.5 bg-violet-300 dark:bg-purple-800 rounded-full" />
          </div>
        </div>

        {/* کانتینر اصلی اسلایدر */}
        <div
          className="relative w-full max-w-5xl mx-auto"
          onMouseEnter={() => setIsHoveredOrTouched(true)}
          onMouseLeave={() => setIsHoveredOrTouched(false)}
          onTouchStart={() => setIsHoveredOrTouched(true)}
          onTouchEnd={() => setIsHoveredOrTouched(false)}
        >
          {/* دکمه‌های کنترل */}
          <button
            onClick={prevSlide}
            className={`absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-110 ${theme === "dark" ? "bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-700" : "bg-white/80 border-gray-200/50 text-gray-900 hover:bg-white shadow-lg"}`}
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-110 ${theme === "dark" ? "bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-700" : "bg-white/80 border-gray-200/50 text-gray-900 hover:bg-white shadow-lg"}`}
          >
            <FiChevronRight size={24} />
          </button>

          {/* نوار اسلایدر */}
          <div className="overflow-visible w-full px-4 sm:px-12 py-4">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="min-w-full w-full flex-shrink-0 px-2 sm:px-6"
                >
                  <motion.div
                    animate={{
                      scale: currentIndex === index ? 1 : 0.85,
                      opacity: currentIndex === index ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full relative z-10"
                  >
                    <ProjectCard
                      project={project}
                      isActive={currentIndex === index}
                      onFlip={setIsCardFlipped}
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* نشانگرها (Dots) */}
          <div className="flex justify-center items-center gap-3 mt-8 relative z-20">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: currentIndex === index ? "3rem" : "0.75rem" }}
              >
                <div
                  className={`absolute inset-0 ${theme === "dark" ? "bg-gray-700/50 backdrop-blur-sm" : "bg-gray-300/80"}`}
                />
                {currentIndex === index && !shouldPause && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: AUTOPLAY_DELAY / 1000,
                      ease: "linear",
                    }}
                    key={`progress-${currentIndex}`}
                  />
                )}
                {currentIndex === index && shouldPause && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full w-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
