import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-14 max-w-7xl mx-auto">
      {children}
    </section>
  );
}
