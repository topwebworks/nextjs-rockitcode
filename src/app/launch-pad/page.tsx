import React from 'react'
import { CareerLaunchPad } from '@/components/career-launch-pad-new'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Launch Pad - RockitCode Mission Control',
  description: 'Your mission control center for launching a successful developer career. Professional setup, skill progression, and career tracking all in one place.',
};

// Force static generation for better Vercel performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export default function LaunchPadPage() {
  return <CareerLaunchPad />
}
