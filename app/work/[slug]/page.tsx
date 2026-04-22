import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudy, getCaseStudySlugs, getAllCaseStudies } from "@/lib/mdx";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import NextProject from "@/components/case-study/NextProject";
import { mdxComponents } from "@/components/case-study/MDXComponents";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter: cs } = getCaseStudy(slug);
  return {
    title: `${cs.client} — ${cs.title} | Natalia Bustos`,
    openGraph: {
      images: cs.heroImage ? [{ url: cs.heroImage }] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const slugs = getCaseStudySlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const { frontmatter, content } = getCaseStudy(slug);
  const allStudies = getAllCaseStudies();
  const nextStudy = allStudies.find((s) => s.slug === frontmatter.nextSlug);

  return (
    <>
      <CaseStudyHeader study={frontmatter} />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      {nextStudy && (
        <NextProject
          slug={nextStudy.slug}
          client={nextStudy.client}
          headline={nextStudy.title}
          headlineEs={nextStudy.titleEs}
          cardBg={nextStudy.cardBg}
        />
      )}
    </>
  );
}
