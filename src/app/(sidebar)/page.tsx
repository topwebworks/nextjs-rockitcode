import { SimpleCentered } from "@/components/tailwind-ui/marketing/heroes";
import { 
  SimpleThreeColumnWithSmallIcons, 
  WithProductScreenshot, 
  WithLargeScreenshot
} from "@/components/tailwind-ui/marketing/features";
import { SimpleCentered as SimpleCTA } from "@/components/tailwind-ui/marketing/cta";
import { ThreeColumnBentoGrid } from "@/components/tailwind-ui/marketing/bento-grids";
import { 
  ThreeTiers, 
  TwoTiersWithEmphasizedTier, 
  SinglePriceWithDetails 
} from "@/components/tailwind-ui/marketing/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RockitCode - Learn to Code Fast & Easy",
  description:
    "The easiest and fastest way to learn to code for any age (13+). Master HTML/CSS, JavaScript, and Python with interactive courses.",
};

export default function Page() {
  return (
    <>
      <SimpleCentered />
      <WithProductScreenshot />
      <WithLargeScreenshot />
      <SimpleThreeColumnWithSmallIcons />
      <ThreeColumnBentoGrid />
      <ThreeTiers />
      <TwoTiersWithEmphasizedTier />
      <SinglePriceWithDetails />
      <SimpleCTA />
    </>
  );
}
