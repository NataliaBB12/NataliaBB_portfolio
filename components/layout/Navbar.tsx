"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Menu from "@/components/ui/navbar";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/#work", label: t.nav.work },
    { href: "/about", label: t.nav.about },
    {
      href: "https://www.linkedin.com/in/natalia-bubon/?skipRedirect=true",
      label: t.nav.linkedin,
      external: true,
    },
  ];

  const desktopMenu = [
    {
      id: 1,
      title: t.nav.work,
      url: "/#work",
      dropdown: true,
      items: [
        { id: 11, title: "Aeroméxico", url: "/work/aeromexico", logo: "/images/logos/aeromexico.jpeg" },
        { id: 12, title: "Mercado Pago", url: "/work/mercado-credito", logo: "/images/logos/mercado-pago.png" },
        { id: 13, title: "Stori", url: "/work/stori", logo: "/images/logos/stori.png" },
        { id: 14, title: "Wemerang", url: "/work/wemerang", logo: "/images/logos/wemerang.png" },
      ],
    },
    { id: 2, title: t.nav.about, url: "/about" },
    {
      id: 3,
      title: t.nav.linkedin,
      url: "https://www.linkedin.com/in/natalia-bubon/?skipRedirect=true",
      external: true,
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/#work") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg-primary/85 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-24">
        <Link
          href="/"
          className="font-signature text-text-primary hover:opacity-70 transition-opacity duration-300"
          style={{ fontSize: "32px" }}
        >
          Natalia
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Menu list={desktopMenu} activeHref={pathname} />
          <div className="ml-2">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile — toggle + hamburger (only when drawer is closed) */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageToggle />
          <button
            className="relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span className="absolute block h-[1.5px] w-5 bg-text-primary -translate-y-[5px]" />
            <span className="absolute block h-[1.5px] w-3.5 bg-text-primary" />
            <span className="absolute block h-[1.5px] w-5 bg-text-primary translate-y-[5px]" />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu — z-[60] so it sits above the navbar band */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] md:hidden"
            style={{ backgroundColor: "#FDF6F0" }}
          >
            {/* Close button — top-right, always visible */}
            <button
              className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <span className="absolute block h-[1.5px] w-5 bg-text-primary rotate-45" />
              <span className="absolute block h-[1.5px] w-5 bg-text-primary -rotate-45" />
            </button>

            <div className="flex flex-col justify-center items-center h-full gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`block text-3xl font-normal py-4 px-8 transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    {link.external && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="inline-block ml-2 -mt-1 opacity-50"
                      >
                        <path
                          d="M3 1h6v6M9 1L1 9"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Email at bottom of mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="absolute bottom-12 left-0 right-0 text-center"
              >
                <a
                  href="mailto:natalia.bustosbonfil@gmail.com"
                  className="text-[13px] text-text-secondary/60 hover:text-accent-coral transition-colors duration-300 tracking-wide"
                >
                  natalia.bustosbonfil@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
