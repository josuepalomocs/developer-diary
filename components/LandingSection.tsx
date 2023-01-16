import LandingContent from "./LandingContent";

interface LandingSectionProps {}

export default function LandingSection({}: LandingSectionProps) {
  return (
    <div className="text-center flex justify-center items-center h-screen">
      <LandingContent />
    </div>
  );
}
