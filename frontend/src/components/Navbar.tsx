"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    // Dynamic section tracking via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -50% 0px", // Triggers when the section dominates the center viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const id = link.href.substring(1);
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <a href="#hero" className="group">
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Rashid
            <span className="text-[#888] font-normal ml-0.5">.</span>
          </span>
        </a>

        {/* Desktop sliding pill navigation */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-900/30 border border-white/[0.04] p-1 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[12.5px] px-4 py-1.5 rounded-full font-medium transition-colors duration-500"
                style={{ color: isActive ? "#000" : "#888" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Dummy placeholder to align elements beautifully if logo is on left */}
        <div className="hidden md:block w-12" />

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] w-6"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] bg-white/70 transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[3.5px] w-5" : "w-6"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-white/70 transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px] w-5" : "w-4"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-2xl border-b border-white/[0.04]"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[15px] font-medium transition-all py-2.5 px-4 rounded-xl ${
                      isActive ? "bg-white text-black font-semibold" : "text-[#888] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
