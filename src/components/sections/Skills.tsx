// src/components/sections/Skills.tsx
import type { MouseEvent } from "react";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaGitAlt,
  FaGitlab,
  FaSass,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { Icon } from "@iconify/react";
import { FaRotate } from "react-icons/fa6";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: "core" | "framework" | "tooling";
  color: string;
  lightColor: string;
  darkColor: string;
  shadowColor: string;
  desc: string;
  iconColor: string;
}

const skillsData: Skill[] = [
  {
    name: "HTML",
    icon: <FaHtml5 />,
    level: 5,
    category: "core",
    color: "from-orange-500 to-red-500",
    lightColor: "bg-orange-50 border-orange-200",
    darkColor: "dark:bg-gray-800 dark:border-orange-500/40",
    shadowColor: "shadow-orange-200 dark:shadow-orange-500/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    desc: "Semantic markup & accessibility-first structure.",
  },
  {
    name: "CSS",
    icon: <FaCss3Alt />,
    level: 5,
    category: "core",
    color: "from-blue-500 to-cyan-500",
    lightColor: "bg-blue-50 border-blue-200",
    darkColor: "dark:bg-gray-800 dark:border-blue-500/40",
    shadowColor: "shadow-blue-200 dark:shadow-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    desc: "Layouts, animations, and responsive design.",
  },
  {
    name: "JavaScript",
    icon: <FaJs />,
    level: 4,
    category: "core",
    color: "from-yellow-400 to-amber-500",
    lightColor: "bg-yellow-50 border-yellow-200",
    darkColor: "dark:bg-gray-800 dark:border-yellow-500/40",
    shadowColor: "shadow-yellow-200 dark:shadow-yellow-500/30",
    iconColor: "text-yellow-500 dark:text-yellow-400",
    desc: "ES6+, async/await, DOM manipulation.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    level: 4,
    category: "core",
    color: "from-blue-600 to-blue-400",
    lightColor: "bg-blue-50 border-blue-200",
    darkColor: "dark:bg-gray-800 dark:border-blue-600/40",
    shadowColor: "shadow-blue-200 dark:shadow-blue-600/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    desc: "Type-safe code, interfaces, and generics.",
  },
  {
    name: "React",
    icon: <FaReact />,
    level: 4,
    category: "framework",
    color: "from-cyan-400 to-sky-500",
    lightColor: "bg-cyan-50 border-cyan-200",
    darkColor: "dark:bg-gray-800 dark:border-cyan-500/40",
    shadowColor: "shadow-cyan-200 dark:shadow-cyan-500/30",
    iconColor: "text-cyan-500 dark:text-cyan-400",
    desc: "Hooks, context, custom hooks & performance.",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    level: 3,
    category: "framework",
    color: "from-gray-700 to-gray-900",
    lightColor: "bg-gray-50 border-gray-200",
    darkColor: "dark:bg-gray-800 dark:border-gray-500/40",
    shadowColor: "shadow-gray-200 dark:shadow-gray-500/30",
    iconColor: "text-gray-800 dark:text-gray-200",
    desc: "SSR, SSG, App Router & API routes.",
  },
  {
    name: "Vue",
    icon: <FaVuejs />,
    level: 3,
    category: "framework",
    color: "from-emerald-500 to-green-400",
    lightColor: "bg-emerald-50 border-emerald-200",
    darkColor: "dark:bg-gray-800 dark:border-emerald-500/40",
    shadowColor: "shadow-emerald-200 dark:shadow-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    desc: "Composition API, Pinia & Vue Router.",
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss />,
    level: 5,
    category: "framework",
    color: "from-teal-400 to-cyan-500",
    lightColor: "bg-teal-50 border-teal-200",
    darkColor: "dark:bg-gray-800 dark:border-teal-500/40",
    shadowColor: "shadow-teal-200 dark:shadow-teal-500/30",
    iconColor: "text-teal-500 dark:text-teal-400",
    desc: "Utility-first styling & design systems.",
  },
  {
    name: "SCSS",
    icon: <FaSass />,
    level: 4,
    category: "framework",
    color: "from-pink-500 to-rose-400",
    lightColor: "bg-pink-50 border-pink-200",
    darkColor: "dark:bg-gray-800 dark:border-pink-500/40",
    shadowColor: "shadow-pink-200 dark:shadow-pink-500/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    desc: "Variables, mixins, nesting & BEM.",
  },
  {
    name: "Git",
    icon: <FaGitAlt />,
    level: 4,
    category: "tooling",
    color: "from-orange-600 to-red-500",
    lightColor: "bg-orange-50 border-orange-200",
    darkColor: "dark:bg-gray-800 dark:border-orange-600/40",
    shadowColor: "shadow-orange-200 dark:shadow-orange-600/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    desc: "Branching, rebasing & team workflows.",
  },
  {
    name: "GitLab",
    icon: <FaGitlab />,
    level: 3,
    category: "tooling",
    color: "from-orange-500 to-amber-400",
    lightColor: "bg-amber-50 border-amber-200",
    darkColor: "dark:bg-gray-800 dark:border-amber-500/40",
    shadowColor: "shadow-amber-200 dark:shadow-amber-500/30",
    iconColor: "text-orange-500 dark:text-orange-400",
    desc: "CI/CD pipelines & merge request flows.",
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "core", label: "Core" },
  { key: "framework", label: "Frameworks" },
  { key: "tooling", label: "Tooling" },
] as const;

type Category = "all" | "core" | "framework" | "tooling";

const ProficiencyLevel = ({ level }: { level: number }) => {
  const getLevelText = (lvl: number) => {
    if (lvl >= 5) return "Expert";
    if (lvl === 4) return "Advanced";
    if (lvl === 3) return "Intermediate";
    if (lvl === 2) return "Familiar";
    return "Beginner";
  };

  return (
    <div className="mt-3 flex flex-col items-center gap-2">
      <span className="text-white font-semibold text-[11px] tracking-widest uppercase opacity-90">
        {getLevelText(level)}
      </span>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
            className={`h-1.5 w-4 rounded-full ${
              i <= level
                ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setFlipped(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 300, damping: 24 },
        },
      }}
      ref={cardRef}
      className="relative h-40 cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 rounded-2xl border flex flex-col items-center justify-center gap-3 overflow-hidden
              ${skill.lightColor} ${skill.darkColor}
              transition-shadow duration-300
              ${isHovered && !flipped ? `shadow-xl dark:shadow-2xl ${skill.shadowColor}` : "shadow-md dark:shadow-none"}
            `}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Flip hint - top right */}
            <div
              className={`absolute top-2 right-2 flex flex-col items-center gap-0.5 transition-all duration-300 z-20 ${
                isHovered && !flipped
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              <motion.div
                animate={{
                  rotate: isHovered && !flipped ? [0, 15, -15, 0] : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-gray-600 dark:text-gray-300"
              >
                {/* <Icon icon="lucide:rotate-ccw" width="18" height="18" /> */}
              </motion.div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Click to flip
                </span>
                <button className="text-gray-400">
                  <FaRotate />
                </button>
              </div>
            </div>

            <motion.div
              className={`text-5xl md:text-6xl drop-shadow-lg ${skill.iconColor} relative`}
              animate={{
                scale: isHovered && !flipped ? 1.15 : 1,
                rotate: isHovered && !flipped ? [0, -5, 5, 0] : 0,
              }}
              transition={{
                rotate: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              {/* Glow effect */}
              {isHovered && !flipped && (
                <motion.div
                  className="absolute inset-0 blur-xl opacity-60"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className={skill.iconColor}>{skill.icon}</div>
                </motion.div>
              )}

              {/* Main icon with multiple layers */}
              <div className="relative">
                {/* Shadow layer */}
                <div className="absolute inset-0 translate-y-1 opacity-20 blur-sm">
                  {skill.icon}
                </div>
                {/* Main icon */}
                <div className="relative filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                  {skill.icon}
                </div>
              </div>
            </motion.div>

            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 z-10">
              {skill.name}
            </span>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} flex flex-col items-center justify-center gap-2 p-4 shadow-xl`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <p
              className="text-white/95 text-xs text-center leading-relaxed font-medium"
              style={{ transform: "translateZ(1px)" }}
            >
              {skill.desc}
            </p>
            {flipped && <ProficiencyLevel level={skill.level} />}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface SkillsProps {
  skills: string[];
}

const Skills: React.FC<SkillsProps> = ({ skills: skillNames }) => {
  const [active, setActive] = useState<Category>("all");
  const availableSkills = skillsData.filter((s) => skillNames.includes(s.name));
  const filtered =
    active === "all"
      ? availableSkills
      : availableSkills.filter((s) => s.category === active);

  return (
    <section
      id="skills"
      className="relative -mt-20 pt-32 pb-20 sm:pb-24 lg:pb-32 overflow-hidden z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50 to-slate-50/80 dark:via-[#0f172a] dark:to-[#0f172a]/90 -z-20" />

      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 70%)",
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 70%)",
        }}
      />

      <div className="absolute top-40 right-[-10%] w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-[-10%] w-96 h-96 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl -z-10" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-200 dark:border-blue-800 mb-4">
            <Icon
              icon="lucide:layers"
              className="text-blue-600 dark:text-blue-400"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tech Arsenal
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-900 dark:from-white dark:via-blue-200 dark:to-cyan-200 bg-clip-text text-transparent mb-3">
            Skills & Tooling
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center p-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            {categories.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 z-10
                    ${isActive ? "text-white dark:text-gray-900" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 rounded-xl -z-10 shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6"
          >
            {filtered.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
