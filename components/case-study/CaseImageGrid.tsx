import { CaseImageGridProps } from "@/lib/types";

export default function CaseImageGrid({
  columns = 2,
  children,
}: CaseImageGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-4 my-8`}
    >
      {children}
    </div>
  );
}
