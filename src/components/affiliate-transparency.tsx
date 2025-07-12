// 🤝 Affiliate Transparency Page - Complete disclosure of partnerships
// Building trust through radical transparency

import React from 'react';
import { ExternalLink, Heart, Shield, Users, DollarSign, CheckCircle, Star } from 'lucide-react';

interface PartnershipData {
  name: string;
  category: 'Essential' | 'Professional' | 'Specialized';
  description: string;
  whyWePartner: string;
  studentBenefit: string;
  freeAccess: string;
  upgradeScenario: string;
  commissionType: string;
  alternativesExist: boolean;
  usedByTeam: boolean;
}

const partnerships: PartnershipData[] = [
  {
    name: "GitHub",
    category: "Essential",
    description: "Version control, collaboration, and AI-assisted development",
    whyWePartner: "100% of professional developers use Git/GitHub. It's impossible to teach modern development without it.",
    studentBenefit: "Free private repos, GitHub Copilot, and $200k+ Student Pack",
    freeAccess: "Unlimited public repos, Copilot for students, GitHub Pages hosting",
    upgradeScenario: "Only when you get a job and need team collaboration or advanced Copilot features",
    commissionType: "Recurring revenue share on Pro/Team subscriptions",
    alternativesExist: true,
    usedByTeam: true
  },
  {
    name: "AWS",
    category: "Professional", 
    description: "Enterprise cloud infrastructure and scalable deployment",
    whyWePartner: "32% of the internet runs on AWS. It's the most in-demand cloud skill for developers.",
    studentBenefit: "12 months free tier covering all learning projects and portfolio hosting",
    freeAccess: "Free tier includes EC2, S3, Lambda, RDS for 12 months",
    upgradeScenario: "When you build commercial applications or exceed free tier limits",
    commissionType: "Revenue share on usage after free tier",
    alternativesExist: true,
    usedByTeam: true
  },
  {
    name: "Vercel",
    category: "Essential",
    description: "Modern deployment platform for React/Next.js applications",
    whyWePartner: "Industry standard for React deployment. Used by top companies and startups.",
    studentBenefit: "Generous free tier for unlimited personal projects and portfolios",
    freeAccess: "Free deployment for personal projects with custom domains",
    upgradeScenario: "Team collaboration or commercial applications with high traffic",
    commissionType: "Recurring revenue share on Pro/Team plans",
    alternativesExist: true,
    usedByTeam: true
  },
  {
    name: "Tailwind CSS",
    category: "Professional",
    description: "Modern CSS framework and professional component library",
    whyWePartner: "Fastest-growing CSS framework. 3x development speed improvement.",
    studentBenefit: "Free framework plus access to free Tailwind UI components",
    freeAccess: "Complete framework free, plus selected free UI components",
    upgradeScenario: "Professional UI component library for faster development",
    commissionType: "Commission on Tailwind UI subscriptions",
    alternativesExist: true,
    usedByTeam: true
  },
  {
    name: "Azure",
    category: "Professional",
    description: "Microsoft cloud platform and enterprise development tools",
    whyWePartner: "93% of Fortune 500 companies use Azure. Essential for enterprise development.",
    studentBenefit: "$100 annual credit through Azure for Students program",
    freeAccess: "Free student credits and basic services for learning",
    upgradeScenario: "Enterprise development or when building commercial applications",
    commissionType: "Revenue share on usage and subscription services",
    alternativesExist: true,
    usedByTeam: false
  },
  {
    name: "JetBrains",
    category: "Professional",
    description: "Professional IDEs and development tools",
    whyWePartner: "83% of professional teams use JetBrains IDEs. Industry-standard development environment.",
    studentBenefit: "All IDEs completely free for students through GitHub Student Pack",
    freeAccess: "All professional IDEs free for students and open source developers",
    upgradeScenario: "Professional license after graduation or when employed",
    commissionType: "Commission on individual and team license sales",
    alternativesExist: true,
    usedByTeam: true
  }
];

const PartnershipCard: React.FC<{ partnership: PartnershipData }> = ({ partnership }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Essential': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Professional': return 'bg-green-100 text-green-800 border-green-200';
      case 'Specialized': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">{partnership.name}</h3>
          <p className="text-slate-600 text-sm">{partnership.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded border ${getCategoryColor(partnership.category)}`}>
            {partnership.category}
          </span>
          {partnership.usedByTeam && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-slate-500">We use this</span>
            </div>
          )}
        </div>
      </div>

      {/* Why We Partner */}
      <div className="mb-4">
        <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          Why We Partner With Them
        </h4>
        <p className="text-sm text-slate-700">{partnership.whyWePartner}</p>
      </div>

      {/* Student Benefit */}
      <div className="mb-4">
        <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          What Students Get
        </h4>
        <p className="text-sm text-slate-700 mb-2">{partnership.studentBenefit}</p>
        <div className="bg-green-50 p-3 rounded border border-green-200">
          <p className="text-sm text-green-700">
            <strong>Free Access:</strong> {partnership.freeAccess}
          </p>
        </div>
      </div>

      {/* Upgrade Context */}
      <div className="mb-4">
        <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-500" />
          When Upgrades Make Sense
        </h4>
        <p className="text-sm text-slate-700">{partnership.upgradeScenario}</p>
      </div>

      {/* Commission Transparency */}
      <div className="mb-4">
        <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-500" />
          Our Commission Structure
        </h4>
        <p className="text-sm text-slate-600">{partnership.commissionType}</p>
      </div>

      {/* Alternatives Available */}
      {partnership.alternativesExist && (
        <div className="bg-slate-50 p-3 rounded border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Alternatives Available</span>
          </div>
          <p className="text-xs text-slate-600">
            You can complete all missions with alternative tools. We recommend {partnership.name} 
            based on industry adoption and our genuine experience.
          </p>
        </div>
      )}
    </div>
  );
};

export const AffiliateTransparencyPage = () => {
  const essentialPartners = partnerships.filter(p => p.category === 'Essential');
  const professionalPartners = partnerships.filter(p => p.category === 'Professional');
  const specializedPartners = partnerships.filter(p => p.category === 'Specialized');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          🤝 Partnership Transparency
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Complete transparency about our affiliate relationships. These partnerships allow us to keep 
          RockitCode 100% free while recommending tools that genuinely advance your career.
        </p>
      </div>

      {/* Our Philosophy */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">Our Partnership Philosophy</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-medium text-slate-900 mb-1">Student-First</h3>
            <p className="text-sm text-slate-600">We only partner with tools that genuinely help your career</p>
          </div>
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-medium text-slate-900 mb-1">Radical Transparency</h3>
            <p className="text-sm text-slate-600">Full disclosure of every partnership and commission structure</p>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-medium text-slate-900 mb-1">Industry Standard</h3>
            <p className="text-sm text-slate-600">Tools used by 90%+ of professional development teams</p>
          </div>
        </div>
      </div>

      {/* Revenue Transparency */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">How Affiliate Revenue Works</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <p className="text-sm text-slate-700">
              <strong>You get the same price:</strong> Affiliate links never increase your cost. Often you get student discounts.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <p className="text-sm text-slate-700">
              <strong>We earn when you succeed:</strong> Commissions only come when students upgrade after landing jobs.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <p className="text-sm text-slate-700">
              <strong>Platform stays free:</strong> Affiliate revenue funds development, keeping RockitCode free forever.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <p className="text-sm text-slate-700">
              <strong>Always alternatives:</strong> Every lesson includes free and alternative options.
            </p>
          </div>
        </div>
      </div>

      {/* Partnership Categories */}
      <div className="space-y-8">
        {/* Essential Partners */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Essential Mission Equipment</h2>
          <p className="text-slate-600 mb-6">
            Core tools used by 90%+ of professional developers. These form the foundation of modern development workflows.
          </p>
          <div className="grid lg:grid-cols-2 gap-6">
            {essentialPartners.map((partnership) => (
              <PartnershipCard key={partnership.name} partnership={partnership} />
            ))}
          </div>
        </section>

        {/* Professional Partners */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Professional Development Tools</h2>
          <p className="text-slate-600 mb-6">
            Advanced tools that accelerate development and prepare you for enterprise environments.
          </p>
          <div className="grid lg:grid-cols-2 gap-6">
            {professionalPartners.map((partnership) => (
              <PartnershipCard key={partnership.name} partnership={partnership} />
            ))}
          </div>
        </section>

        {/* Specialized Partners */}
        {specializedPartners.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Specialized Services</h2>
            <p className="text-slate-600 mb-6">
              Specialized tools for specific use cases and advanced career development.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {specializedPartners.map((partnership) => (
                <PartnershipCard key={partnership.name} partnership={partnership} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Contact & Feedback */}
      <div className="bg-slate-50 rounded-lg p-6 mt-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Questions or Concerns?</h2>
        <p className="text-slate-600 mb-4">
          We're committed to complete transparency. If you have questions about any partnership 
          or want to suggest better alternatives, we'd love to hear from you.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="mailto:partnerships@rockitcode.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us About Partnerships
            <ExternalLink className="w-4 h-4" />
          </a>
          <a 
            href="/community"
            className="inline-flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Discuss in Community
            <Users className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AffiliateTransparencyPage;
