import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  issuerUrl: string;
  date: string; // Changed from year to date
  credentialUrl: string;
  description: string;
  topics: string[];
  glowColor: string; //
}

interface CertificationsProps {
  certifications: Certification[];
}

// Turbo snail SVG — inspired by the TurboFront mascot
// Replace the TurboSnail component with this:
const TurboSnail = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 140 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Body - beige/tan color */}
    <motion.path
      d="M30 65 Q20 60, 18 50 Q16 40, 22 35 L45 35 Q50 40, 52 50 L52 70 Q45 75, 35 72 Z"
      fill="#E8B896"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    />

    {/* Shell base - blue gradient */}
    <motion.ellipse
      cx="75"
      cy="45"
      rx="38"
      ry="32"
      fill="url(#shellBlue)"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />

    {/* Shell white/orange stripes */}
    <motion.path
      d="M75 45 Q90 35, 95 30 Q100 25, 98 35 Q96 45, 85 50 Q75 55, 70 50 Q65 45, 70 38 Q73 32, 80 30"
      fill="url(#shellStripe)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    />

    {/* Turbine/engine on shell - orange/red */}
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.7, type: "spring" }}
    >
      <circle cx="95" cy="45" r="12" fill="url(#turbineGrad)" />
      <circle cx="95" cy="45" r="8" fill="#1e3a8a" opacity="0.8" />
      {/* Turbine blades */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 95 + Math.cos(rad) * 4;
        const y1 = 45 + Math.sin(rad) * 4;
        const x2 = 95 + Math.cos(rad) * 10;
        const y2 = 45 + Math.sin(rad) * 10;
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fb923c"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "95px 45px" }}
          />
        );
      })}
    </motion.g>

    {/* Exhaust pipes - orange/red */}
    <motion.g
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <ellipse cx="110" cy="38" rx="8" ry="4" fill="#ef4444" />
      <ellipse cx="110" cy="52" rx="8" ry="4" fill="#ef4444" />
      <rect x="105" y="36" width="15" height="4" fill="#f97316" rx="2" />
      <rect x="105" y="50" width="15" height="4" fill="#f97316" rx="2" />
    </motion.g>

    {/* Fire/exhaust effect */}
    <motion.g
      animate={{
        scaleX: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{ duration: 0.4, repeat: Infinity }}
    >
      <ellipse cx="125" cy="38" rx="8" ry="3" fill="url(#fireGrad)" />
      <ellipse cx="125" cy="52" rx="8" ry="3" fill="url(#fireGrad)" />
    </motion.g>

    {/* Head */}
    <motion.ellipse
      cx="25"
      cy="45"
      rx="12"
      ry="14"
      fill="#E8B896"
      initial={{ x: -15, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />

    {/* Eye stalks */}
    <motion.g
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.8 }}
      style={{ transformOrigin: "25px 38px" }}
    >
      <line
        x1="22"
        y1="38"
        x2="20"
        y2="28"
        stroke="#E8B896"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="38"
        x2="30"
        y2="28"
        stroke="#E8B896"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.g>

    {/* Eyes with goggles */}
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      {/* Left eye */}
      <circle cx="20" cy="27" r="5" fill="white" />
      <circle cx="20" cy="27" r="3" fill="#1e3a8a" />
      <circle cx="21" cy="26" r="1.5" fill="white" opacity="0.9" />
      {/* Goggle frame */}
      <circle
        cx="20"
        cy="27"
        r="5.5"
        fill="none"
        stroke="#f97316"
        strokeWidth="1.5"
      />

      {/* Right eye */}
      <circle cx="30" cy="27" r="5" fill="white" />
      <circle cx="30" cy="27" r="3" fill="#1e3a8a" />
      <circle cx="31" cy="26" r="1.5" fill="white" opacity="0.9" />
      {/* Goggle frame */}
      <circle
        cx="30"
        cy="27"
        r="5.5"
        fill="none"
        stroke="#f97316"
        strokeWidth="1.5"
      />

      {/* Goggle bridge */}
      <line
        x1="25.5"
        y1="27"
        x2="24.5"
        y2="27"
        stroke="#f97316"
        strokeWidth="1.5"
      />
    </motion.g>

    {/* Smile */}
    <motion.path
      d="M20 50 Q25 53, 30 50"
      stroke="#8B6F47"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.2 }}
    />

    {/* Speed lines */}
    {[0, 1, 2].map((i) => (
      <motion.line
        key={i}
        x1={10 - i * 8}
        y1={55 + i * 6}
        x2={-5 - i * 8}
        y2={55 + i * 6}
        stroke="url(#speedGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.3 + i * 0.1 }}
        style={{ transformOrigin: `${10 - i * 8}px ${55 + i * 6}px` }}
      />
    ))}

    {/* Medal/badge on body */}
    <motion.g
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.1, type: "spring" }}
    >
      <circle cx="40" cy="60" r="4" fill="#fbbf24" />
      <circle cx="40" cy="60" r="2.5" fill="#f59e0b" />
      <text
        x="40"
        y="62"
        fontSize="4"
        fill="#fff"
        textAnchor="middle"
        fontWeight="bold"
      >
        ★
      </text>
    </motion.g>

    <defs>
      <linearGradient id="shellBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>

      <linearGradient id="shellStripe" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="50%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fdba74" />
      </linearGradient>

      <linearGradient id="turbineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>

      <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const CertCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full mb-8 group"
    >
      {/* هاله نورانی در زمان هاور */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* کانتینر اصلی بلیت */}
      <div className="relative flex flex-col md:flex-row bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-indigo-400/50 dark:group-hover:border-indigo-500/50 shadow-lg group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
        {/* پس‌زمینه بافت‌دار ملایم */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white dark:from-indigo-900/20 dark:via-gray-900 dark:to-gray-900 pointer-events-none" />

        {/* بخش اصلی بلیت (سمت چپ) */}
        <div className="flex-1 p-6 md:p-8 relative">
          {/* واترمارک حلزون - اصلاح شده برای لایت مود */}
          <div className="absolute top-4 right-4 opacity-15 dark:opacity-10 group-hover:opacity-30 dark:group-hover:opacity-25 transition-all duration-700 rotate-12 group-hover:-rotate-6 group-hover:scale-125 pointer-events-none">
            <TurboSnail className="w-24 h-24 text-indigo-600 dark:text-indigo-400 drop-shadow-lg" />
            <div className="absolute -bottom-1 -right-2 bg-indigo-100/80 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 text-[10px] font-mono px-1.5 py-0.5 border border-indigo-300 dark:border-indigo-500/30 rounded shadow-sm backdrop-blur-sm">
              VERIFIED
            </div>
          </div>

          <div className="flex flex-col h-full z-10 relative">
            <div className="mb-4">
              {/* بج مدرن برای Official Credential */}
              <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 w-max">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[11px] font-bold font-mono text-green-700 dark:text-green-400 uppercase tracking-widest">
                  Official Credential
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 group-hover:from-indigo-600 group-hover:to-purple-600 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 transition-all duration-300">
                {cert.title}
              </h3>

              <a
                href={cert.issuerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md"
              >
                Issued by <span className="font-bold">{cert.issuer}</span>
              </a>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-2xl font-medium">
              {cert.description}
            </p>

            {/* تگ‌های مدرن */}
            <div className="mt-auto flex flex-wrap gap-2">
              {cert.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* خط‌چین وسط و بریدگی‌های بلیت */}
        <div className="relative flex items-center justify-center bg-white dark:bg-transparent border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 border-dashed">
          <div className="absolute -top-3 md:top-[-12px] md:-left-3 w-6 h-6 bg-slate-50 dark:bg-[#0f172a] rounded-full border border-gray-200 dark:border-gray-800 hidden md:block shadow-inner" />
          <div className="absolute -bottom-3 md:bottom-[-12px] md:-left-3 w-6 h-6 bg-slate-50 dark:bg-[#0f172a] rounded-full border border-gray-200 dark:border-gray-800 hidden md:block shadow-inner" />
        </div>

        {/* ته‌بلیت (سمت راست / پایین) */}
        <div className="w-full md:w-56 p-6 md:p-8 flex flex-row md:flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/50 relative overflow-hidden">
          {/* خطوط تزئینی پس‌زمینه ته‌بلیت */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
              backgroundSize: "10px 10px",
            }}
          />

          <div className="text-left md:text-center w-full z-10">
            <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
              Issue Date
            </p>
            <p className="text-xl font-black font-mono text-gray-800 dark:text-gray-200 tracking-tight">
              {cert.date}
            </p>
          </div>

          {/* بارکد مدرن‌تر */}
          <div className="hidden md:flex w-full h-12 my-6 opacity-40 dark:opacity-50 justify-between items-end gap-[2px] z-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`bg-gray-800 dark:bg-gray-300 rounded-t-sm h-full ${i % 4 === 0 ? "w-1.5" : i % 3 === 0 ? "w-1" : i % 2 === 0 ? "w-2.5 h-4/5" : "w-0.5 h-full"}`}
              />
            ))}
          </div>

          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative z-10 flex items-center justify-center gap-2 w-full md:mt-auto px-5 py-3 bg-gray-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-md hover:shadow-xl hover:shadow-indigo-500/20"
          >
            <span className="hidden md:inline">Inspect Core</span>
            <span className="md:hidden">Inspect</span>
            <FiArrowRight className="group-hover/btn:translate-x-1 group-hover/btn:rotate-[-45deg] transition-all duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = ({ certifications }: CertificationsProps) => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="certifications"
      className="py-20 px-6 bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-indigo-300 dark:bg-indigo-600 rounded-full filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 left-20 w-64 h-64 bg-purple-300 dark:bg-purple-600 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-200 dark:border-indigo-800 mb-4">
            <HiOutlineAcademicCap className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Education & Training
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent mb-3">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Cards */}
        <div className="space-y-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
