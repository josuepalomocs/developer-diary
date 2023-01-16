import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  as: keyof JSX.IntrinsicElements;
}

export default function PageWrapper({ children, as }: PageWrapperProps) {
  const IntrinsicElement = as;
  return (
    <IntrinsicElement className="max-w-full min-h-screen">
      {children}
    </IntrinsicElement>
  );
}
