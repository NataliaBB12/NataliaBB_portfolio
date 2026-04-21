"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";

export type IMenu = {
  id: number;
  title: string;
  url: string;
  dropdown?: boolean;
  items?: IMenu[];
  external?: boolean;
  logo?: string;
};

type MenuProps = {
  list: IMenu[];
  activeHref?: string;
};

const Menu = ({ list, activeHref }: MenuProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <MotionConfig transition={{ bounce: 0, type: "tween", duration: 0.18 }}>
      <nav className="relative">
        <ul className="flex items-center gap-10">
          {list.map((item) => {
            const isActive = activeHref
              ? activeHref === item.url || activeHref?.startsWith(item.url.replace("/#", "/"))
              : false;

            return (
              <li key={item.id} className="relative">
                <Link
                  href={item.url}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`relative text-[13px] tracking-wide transition-colors duration-300 flex items-center gap-1 ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary/60 hover:text-text-primary"
                  }`}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {item.title}

                  {/* Chevron for dropdown items */}
                  {item.dropdown && (
                    <motion.svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="opacity-40"
                      animate={{ rotate: hovered === item.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        d="M2 3.5l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}

                  {/* External icon */}
                  {item.external && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="opacity-40"
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

                  {/* Active underline */}
                  {isActive && !item.dropdown && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-text-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Dropdown panel */}
                {item.dropdown && item.items && hovered === item.id && (
                  <div
                    className="absolute left-0 top-full pt-4 z-50"
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="w-56 flex flex-col rounded-xl bg-bg-primary border border-border-subtle shadow-[0_8px_30px_-8px_rgba(25,42,81,0.12)] overflow-hidden"
                    >
                      {item.items.map((nav) => (
                        <Link
                          key={nav.id}
                          href={nav.url}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-text-primary/[0.03] transition-colors duration-200 border-b border-border-subtle last:border-0 group/item"
                        >
                          {nav.logo && (
                            <div className="w-7 h-7 rounded-md overflow-hidden flex-shrink-0 bg-white border border-border-subtle flex items-center justify-center">
                              <Image
                                src={nav.logo}
                                alt={`${nav.title} logo`}
                                width={28}
                                height={28}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <span className="text-[13px] text-text-secondary/70 group-hover/item:text-text-primary transition-colors duration-200">
                            {nav.title}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </MotionConfig>
  );
};

export default Menu;
