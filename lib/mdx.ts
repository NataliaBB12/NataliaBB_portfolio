import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CaseStudy } from "./types";

const contentDir = path.join(process.cwd(), "content/case-studies");

export function getCaseStudySlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseStudy(slug: string): {
  frontmatter: CaseStudy;
  content: string;
} {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as CaseStudy, content };
}

export function getAllCaseStudies(): CaseStudy[] {
  return getCaseStudySlugs()
    .map((slug) => getCaseStudy(slug).frontmatter)
    .sort((a, b) => a.order - b.order);
}
