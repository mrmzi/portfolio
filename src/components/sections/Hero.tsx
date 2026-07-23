import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiArrowRight } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { useTheme } from "../../hook/useTheme";
import type { PersonalInfo } from "../../data";

interface HeroProps {
  data: PersonalInfo;
}

const TITLES = [
  "Frontend Developer",
  "React Specialist",
  "UI/UX Enthusiast",
  "Next.js Developer",
];

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { theme } = useTheme();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Typewriter
  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        45,
      );
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors =
      theme === "dark"
        ? ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4"]
        : ["#818cf8", "#a78bfa", "#60a5fa", "#38bdf8"];

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  const firstName = data.name.split(" ")[0];

  return (
    <section
      id="hero"
      className="pt-30 pb-10 sm:pt-24 relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30" />

      {/* Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-sm text-gray-600 dark:text-gray-400 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for work
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 leading-tight">
              <span className="text-gray-900 dark:text-white">Hi, I'm </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {firstName}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-full opacity-60" />
              </span>
            </h1>

            {/* Typewriter */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300">
                {displayed}
                <span
                  className={`inline-block w-0.5 h-6 sm:h-7 bg-blue-500 ml-1 align-middle transition-opacity duration-100 ${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {data.heroTagline}
            </p>

            {/* CTAs */}
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-105" />
                <span className="relative flex items-center gap-2">
                  View Projects
                  <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-3.5 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  Contact Me
                  <IoSend className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </button>
            </div>

            {/* Resume + Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 justify-center lg:justify-start">
              {/* Resume Button */}
              <a
                href={
                  "https://cvbuilder.me/Resume/fa/11953a60-21b1-404c-a835-5ec9faa3990c?template=Template35"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-2.5 rounded-xl font-medium text-sm overflow-hidden border-2 border-emerald-500/50 dark:border-emerald-400/50 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10" />
                <span className="relative flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Resume
                </span>
              </a>

              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-600" />

              {/* Socials */}
              <div className="flex items-center gap-4">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>

                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>

                <a
                  href={`mailto:${data.email}`}
                  className="p-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  aria-label="Email"
                >
                  <HiMail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

              <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/50 shadow-2xl">
                {data.avatar ? (
                  <img
                    src={
                      theme === "light" ? data.lightProfile : data.darkProfile
                    }
                    alt={data.name}
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {firstName[0]}
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Add avatar to data
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Badge: Experience */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Experience
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    2+ Years
                  </p>
                </div>
              </div>

              {/* Badge: Projects */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Projects
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    5+ Done
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
