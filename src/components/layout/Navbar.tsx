import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../../constants/navigation";
import { useTheme } from "../../hook/useTheme";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // استیت جدید برای نمایش/مخفی کردن نوبار

  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0); // ذخیره موقعیت قبلی اسکرول
  const { theme, toggleTheme } = useTheme();

  // ناظر (Observer) برای بخش‌های فعال
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // هندل کردن اسکرول برای مخفی/ظاهر شدن و تغییر بک‌گراند
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // تغییر استایل پس‌زمینه
      setScrolled(currentScrollY > 20);

      // منطق مخفی/ظاهر شدن نوبار بر اساس جهت اسکرول
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // اسکرول به پایین (بیشتر از 80 پیکسل برای جلوگیری از مخفی شدن در همون ثانیه اول)
        setIsVisible(false);
        setIsMobileMenuOpen(false); // بستن منوی موبایل موقع اسکرول به پایین
      } else {
        // اسکرول به بالا
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // بستن منو در صورت تغییر سایز صفحه
  useEffect(() => {
    const handleResize = () => setIsMobileMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // بستن منو در صورت کلیک بیرون از نوبار
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform border-b ${
        isVisible ? "translate-y-0" : "-translate-y-full" // انیمیشن خروج به بالا
      } ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-gray-200/50 dark:border-gray-700/50"
          : "bg-transparent border-transparent" // رفع مشکل پرش حاشیه سفید
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* لوگوی جدید */}
        <button
          onClick={() => handleNavClick("hero")}
          className="relative group flex items-center"
        >
          <div className="flex items-center gap-0.5 tracking-tighter">
            <span className="text-xl sm:text-2xl font-light text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
              &lt;
            </span>
            <span className="porta-font text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transform transition-transform duration-300 group-hover:scale-110 mx-1">
              M.M
            </span>
            <span className="text-xl sm:text-2xl font-light text-gray-400 dark:text-gray-500 group-hover:text-purple-500 transition-colors duration-300">
              /&gt;
            </span>
          </div>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleNavClick(id)}
                className={`px-3 lg:px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group ${
                  activeSection === id
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                }`}
              >
                <span className="relative z-10">{label}</span>
                <span
                  className={`absolute inset-0 transition-all duration-300 rounded-lg ${
                    activeSection === id
                      ? "bg-blue-100 dark:bg-blue-900/30 opacity-100"
                      : "bg-gray-100 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-700" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
        border-b border-gray-200 dark:border-gray-800
        shadow-xl transition-all duration-500 overflow-hidden
        ${isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="py-2 px-4 sm:px-6 space-y-1 mb-4">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleNavClick(id)}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base font-semibold ${
                  activeSection === id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-white"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
