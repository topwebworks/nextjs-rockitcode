import { SimpleCenteredHero } from "@/components/tailwind-ui/marketing/heroes";
import { 
  FeaturesGrid, 
  FeaturesWithScreenshot, 
  Centered2x2Grid,
  SimpleThreeColumnLarge 
} from "@/components/tailwind-ui/marketing/features";
import { SimpleCTA } from "@/components/tailwind-ui/marketing/cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RockitCode - Learn to Code Fast & Easy",
  description:
    "The easiest and fastest way to learn to code for any age (13+). Master HTML/CSS, JavaScript, and Python with interactive courses.",
};

export default function Page() {
  return (
    <>
      <SimpleCenteredHero />
      <FeaturesWithScreenshot />
      <Centered2x2Grid />
      <SimpleThreeColumnLarge />
      <SimpleCTA />
    </>
  );
}
