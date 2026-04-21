import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Natalia Bustos",
  description:
    "Learn more about Natalia Bustos, a Product Designer passionate about creating scalable, user-centered solutions.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
