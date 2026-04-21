import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Manifesto from "@/components/home/Manifesto";
import CaseStudyGrid from "@/components/home/CaseStudyGrid";
import { getAllCaseStudies } from "@/lib/mdx";

export default function Home() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <Hero />
      <Philosophy />
      <Manifesto />
      <CaseStudyGrid caseStudies={caseStudies} />
    </>
  );
}
