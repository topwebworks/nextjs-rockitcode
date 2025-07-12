// 🤝 Affiliate Integration Components for RockitCode Launch Pad
// Seamless, transparent, value-first affiliate tool integration

import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle, Info, Star, Users, TrendingUp } from 'lucide-react';

interface AffiliateToolProps {
  tool: {
    name: string;
    role: string;
    industryAdoption: string;
    careerValue: string;
    freeAccess: string;
    upgradeContext: string;
    affiliateDisclosure: string;
    signupUrl: string;
    alternatives: string[];
  };
  missionContext: string;
  isRequired: boolean;
}

export const AffiliateToolIntegration: React.FC<AffiliateToolProps> = ({
  tool,
  missionContext,
  isRequired
}) => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      {/* Mission Context Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Star className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {tool.name} - {tool.role}
          </h3>
          <p className="text-slate-600 text-sm mb-2">
            <strong>Mission Context:</strong> {missionContext}
          </p>
        </div>
        {isRequired && (
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Mission Critical
          </span>
        )}
      </div>

      {/* Industry Relevance & Career Value */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Industry Adoption</span>
          </div>
          <p className="text-sm text-green-700">{tool.industryAdoption}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Career Value</span>
          </div>
          <p className="text-sm text-blue-700">{tool.careerValue}</p>
        </div>
      </div>

      {/* Free Access & Professional Context */}
      <div className="bg-slate-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-slate-900 mb-2">Professional Development Access</h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
            <span className="text-sm text-slate-700">
              <strong>Free Access:</strong> {tool.freeAccess}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <span className="text-sm text-slate-700">
              <strong>Upgrade Context:</strong> {tool.upgradeContext}
            </span>
          </div>
        </div>
      </div>

      {/* Transparent Affiliate Disclosure */}
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mb-4">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-700">
            <strong>Transparency:</strong> {tool.affiliateDisclosure}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href={tool.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Set Up {tool.name}
          <ExternalLink className="w-4 h-4" />
        </a>
        
        <button
          onClick={() => setShowAlternatives(!showAlternatives)}
          className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors"
        >
          View Alternatives
        </button>
        
        <button
          onClick={() => setIsSetupComplete(!isSetupComplete)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isSetupComplete 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isSetupComplete ? 'Setup Complete' : 'Mark as Complete'}
        </button>
      </div>

      {/* Alternatives Section */}
      {showAlternatives && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <h5 className="font-medium text-slate-900 mb-2">Alternative Options</h5>
          <div className="space-y-2">
            {tool.alternatives.map((alternative, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span className="text-sm text-slate-700">{alternative}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            You can complete this mission with any of these alternatives. We recommend {tool.name} 
            based on industry adoption and career preparation value.
          </p>
        </div>
      )}
    </div>
  );
};

// Example usage with AWS integration
export const AWSMissionIntegration = () => {
  const awsTool = {
    name: "AWS",
    role: "Enterprise Cloud Infrastructure",
    industryAdoption: "Used by 32% of all websites and 89% of cloud developer job listings",
    careerValue: "Essential for backend/full-stack developers - appears in 90%+ of senior dev roles",
    freeAccess: "AWS Free Tier includes 12 months of free services covering all learning projects",
    upgradeContext: "Only needed when scaling beyond portfolio projects or building commercial applications",
    affiliateDisclosure: "RockitCode is an AWS partner. This partnership helps keep our platform free while recommending tools we genuinely use and believe in.",
    signupUrl: "https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?referer=rockit-mission",
    alternatives: [
      "DigitalOcean - Simpler interface, good for beginners",
      "Heroku - Easy deployment, higher cost at scale", 
      "Google Cloud Platform - Alternative enterprise option",
      "Microsoft Azure - Strong for .NET and enterprise integration"
    ]
  };

  return (
    <AffiliateToolIntegration
      tool={awsTool}
      missionContext="Deploy your portfolio to production infrastructure used by Netflix, Airbnb, and 90% of startups"
      isRequired={false}
    />
  );
};

// Tailwind CSS Integration
export const TailwindMissionIntegration = () => {
  const tailwindTool = {
    name: "Tailwind CSS + Tailwind UI",
    role: "Modern CSS Framework & Component Library",
    industryAdoption: "Fastest-growing CSS framework, used by GitHub, Netflix, Shopify, and 60% of new React projects",
    careerValue: "3x faster development speed - highly valued skill for frontend and full-stack roles",
    freeAccess: "Tailwind CSS is completely free. Tailwind UI offers free components plus premium library access",
    upgradeContext: "Tailwind UI subscription ($249/year) for professional component library and templates",
    affiliateDisclosure: "We're Tailwind partners because we genuinely believe it's the best CSS framework for modern development. This partnership supports our free platform.",
    signupUrl: "https://tailwindui.com/?ref=rockit-mission",
    alternatives: [
      "Bootstrap - Traditional framework, wider support",
      "Material-UI - Google's design system for React",
      "Chakra UI - Simple, modular component library",
      "Custom CSS - Build everything from scratch"
    ]
  };

  return (
    <AffiliateToolIntegration
      tool={tailwindTool}
      missionContext="Build professional UI components using the same framework as top tech companies"
      isRequired={false}
    />
  );
};

// GitHub Copilot Integration
export const CopilotMissionIntegration = () => {
  const copilotTool = {
    name: "GitHub Copilot",
    role: "AI Pair Programming Assistant",
    industryAdoption: "Used by 92% of professional developers in 2025 - essential modern development skill",
    careerValue: "AI collaboration is now a required skill for developer roles. Shows you're current with modern workflows",
    freeAccess: "Completely free for students and open source contributors with GitHub Student Pack",
    upgradeContext: "Individual plan ($10/month) or Business plan ($19/month) after graduation or when employed",
    affiliateDisclosure: "GitHub sponsors RockitCode because we teach real-world Git workflows. We genuinely believe AI-assisted development is the future.",
    signupUrl: "https://github.com/settings/copilot?ref=rockit-mission",
    alternatives: [
      "TabNine - Alternative AI coding assistant",
      "Amazon CodeWhisperer - AWS's AI coding tool",
      "Replit Ghostwriter - Browser-based AI assistance", 
      "Traditional coding - No AI assistance (not recommended for 2025)"
    ]
  };

  return (
    <AffiliateToolIntegration
      tool={copilotTool}
      missionContext="Learn to collaborate with AI - the same skill used by professional developers at top companies"
      isRequired={false}
    />
  );
};

// Mission Setup Progress Tracker
interface MissionSetupProps {
  missionName: string;
  requiredTools: string[];
  optionalTools: string[];
  completedSetups: string[];
}

export const MissionSetupTracker: React.FC<MissionSetupProps> = ({
  missionName,
  requiredTools,
  optionalTools,
  completedSetups
}) => {
  const requiredProgress = requiredTools.filter(tool => completedSetups.includes(tool)).length;
  const optionalProgress = optionalTools.filter(tool => completedSetups.includes(tool)).length;
  const canStartMission = requiredProgress === requiredTools.length;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        🚀 {missionName} - Equipment Setup
      </h3>
      
      {/* Required Tools Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Mission-Critical Equipment</span>
          <span className="text-sm text-slate-600">{requiredProgress}/{requiredTools.length}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(requiredProgress / requiredTools.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Optional Tools Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Advanced Equipment</span>
          <span className="text-sm text-slate-600">{optionalProgress}/{optionalTools.length}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(optionalProgress / optionalTools.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Mission Status */}
      <div className={`p-3 rounded-lg ${canStartMission ? 'bg-green-100 border border-green-200' : 'bg-amber-100 border border-amber-200'}`}>
        <div className="flex items-center gap-2">
          <CheckCircle className={`w-5 h-5 ${canStartMission ? 'text-green-600' : 'text-amber-600'}`} />
          <span className={`font-medium ${canStartMission ? 'text-green-800' : 'text-amber-800'}`}>
            {canStartMission ? 'Ready for Mission Launch!' : 'Complete required setup to begin mission'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AffiliateToolIntegration;
