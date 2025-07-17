'use client'

import { useState } from 'react'
import { ExternalLink, Info, Heart, Star, Settings } from 'lucide-react'
import { 
  AFFILIATE_PARTNERS, 
  getPartnersByCategory, 
  generateAffiliateUrl, 
  getTransparencyDisclosure,
  calculateProjectedRevenue,
  AFFILIATE_CONFIG,
  type AffiliatePartner 
} from '@/lib/affiliate-config'
import { useUser } from '@/contexts/UserContext'

export function AffiliateLinkManager() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showDisclosure, setShowDisclosure] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const { user } = useUser()

  // Simple admin check - customize with your actual admin email
  const isAdmin = user?.email?.includes('topwebworks') || 
                  user?.email?.includes('@yourcompany.com') || 
                  user?.email === 'admin@rockitcode.com' // Replace with your actual admin email

  const disclosure = getTransparencyDisclosure()
  const projectedRevenue = calculateProjectedRevenue(200) // 200 students

  const categories = [
    { id: 'foundation', name: 'Foundation Tools', icon: '🏗️', description: 'Essential professional setup' },
    { id: 'development', name: 'Development Infrastructure', icon: '⚡', description: 'Scalable cloud & databases' },
    { id: 'business', name: 'Business & E-commerce', icon: '💼', description: 'Monetization platforms' },
    { id: 'specialized', name: 'Specialized Tools', icon: '🛠️', description: 'Advanced development' },
    { id: 'ai-assistant', name: 'AI Assistant Tools', icon: '🤖', description: 'Professional AI development accelerators' },
    { id: 'marketing', name: 'Marketing & Business', icon: '📈', description: 'Audience & client management' }
  ]

  const getToolsByCategory = (category: string) => {
    return getPartnersByCategory(category as AffiliatePartner['category'])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-green-500/50 bg-green-500/10'
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10'
      case 'low': return 'border-gray-500/50 bg-gray-500/10'
      default: return 'border-gray-500/50 bg-gray-500/10'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'border-green-500/50 bg-green-500/10 text-green-300'
      case 'locked': return 'border-gray-500/50 bg-gray-500/10 text-gray-300'
      case 'coming-soon': return 'border-blue-500/50 bg-blue-500/10 text-blue-300'
      default: return 'border-gray-500/50 bg-gray-500/10 text-gray-300'
    }
  }

  const AffiliateToolCard = ({ tool }: { tool: AffiliatePartner }) => (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border transition-all hover:scale-105 ${getPriorityColor(tool.priority)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{tool.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold text-green-400">{tool.value}</span>
              {tool.isStudentFree && (
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-medium">
                  FREE for Students
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            tool.priority === 'high' ? 'bg-green-500/20 text-green-300' :
            tool.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-gray-500/20 text-gray-300'
          }`}>
            {tool.priority.toUpperCase()} PRIORITY
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tool.status)}`}>
            {tool.status.toUpperCase().replace('-', ' ')}
          </span>
          <span className="text-xs text-gray-400">{tool.setupTime}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-4 leading-relaxed">{tool.description}</p>

      {/* Free Value */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-400 font-medium">🎁 Free Value:</span>
        </div>
        <p className="text-blue-200 text-sm">{tool.freeValue}</p>
      </div>

      {/* Career Impact */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-400 font-medium">🚀 Career Impact:</span>
        </div>
        <p className="text-purple-200 text-sm">{tool.careerImpact}</p>
      </div>

      {/* Industry Usage */}
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-orange-400 font-medium">🏢 Industry Usage:</span>
        </div>
        <p className="text-orange-200 text-sm">{tool.industryUsage}</p>
      </div>

      {/* Unlock Conditions */}
      {tool.status === 'locked' && tool.unlockConditions && (
        <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 font-medium">🔒 Unlock Requirements:</span>
          </div>
          <ul className="text-gray-300 text-sm space-y-1">
            {tool.unlockConditions.map((condition, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-gray-500">•</span>
                {condition}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <a
          href={tool.status === 'available' ? generateAffiliateUrl(tool.id) : '#'}
          target={tool.status === 'available' ? "_blank" : undefined}
          rel={tool.status === 'available' ? "noopener noreferrer" : undefined}
          className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
            tool.status === 'available'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{tool.status === 'available' ? 'Get Started' : 'Locked'}</span>
          {tool.status === 'available' && <ExternalLink className="h-4 w-4" />}
        </a>
        <button
          onClick={() => setShowDisclosure(true)}
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>

      {/* Revenue Info (for transparency) */}
      {tool.averageCommission && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            💰 We earn ~{tool.averageCommission} when you upgrade ({tool.conversionRate}% conversion rate)
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header with Config Access */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Pro Tools - Affiliate Central</h1>
          <p className="text-gray-300">
            Centralized management for all affiliate partnerships and revenue tracking.<br/>
            <span className="text-green-400 font-semibold">These are the exact same money-making tools we use daily to earn $200k+/year!</span>
          </p>
        </div>
        <button
          onClick={() => setShowConfig(true)}
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Configure IDs
        </button>
      </div>

      {/* Revenue Analytics Dashboard - Admin Only */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">📊 Revenue Analytics (200 Students) - Admin View</h2>
          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">${projectedRevenue.foundation.toLocaleString()}</div>
              <div className="text-green-200 text-sm">Foundation Tier</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">${projectedRevenue.development.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">Development Tier</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">${projectedRevenue.business.toLocaleString()}</div>
              <div className="text-purple-200 text-sm">Business Tier</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-400">${projectedRevenue.specialized.toLocaleString()}</div>
              <div className="text-orange-200 text-sm">Specialized Tier</div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-cyan-400">${projectedRevenue.aiAssistant.toLocaleString()}</div>
              <div className="text-cyan-200 text-sm">AI Assistant Tier</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">${projectedRevenue.total.toLocaleString()}/month</div>
            <div className="text-yellow-200">Total Monthly Revenue → ${(projectedRevenue.total * 12).toLocaleString()}/year</div>
          </div>
        </div>
      )}

      {/* Transparency Disclosure Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="h-6 w-6 text-red-400" />
          <h2 className="text-2xl font-bold text-white">Professional Tools We Love & Recommend</h2>
        </div>
        <p className="text-blue-200 text-lg mb-4">{disclosure.message}</p>
        <p className="text-purple-200 font-semibold mb-4">{disclosure.emphasis}</p>
        
        <div className="grid md:grid-cols-2 gap-3">
          {disclosure.values.map((value: string, index: number) => (
            <div key={index} className="flex items-center gap-2 text-gray-200">
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Earning Potential - What Students See */}
      {!isAdmin && (
        <div className="bg-gradient-to-r from-purple-600/20 to-green-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">💰 Your Earning Potential with Professional Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-xl font-bold text-green-400">$75-150/hour</div>
              <div className="text-green-200 text-sm">Freelance Development</div>
              <div className="text-xs text-green-300 mt-1">With GitHub + Vercel skills</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💼</div>
              <div className="text-xl font-bold text-blue-400">$70k-120k</div>
              <div className="text-blue-200 text-sm">Entry-Level Jobs</div>
              <div className="text-xs text-blue-300 mt-1">Frontend Developer roles</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-xl font-bold text-purple-400">$2k-10k</div>
              <div className="text-purple-200 text-sm">Client Projects</div>
              <div className="text-xs text-purple-300 mt-1">Small business websites</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-xl font-bold text-orange-400">$150k+</div>
              <div className="text-orange-200 text-sm">Senior Positions</div>
              <div className="text-xs text-orange-300 mt-1">With full stack mastery</div>
            </div>
          </div>
          <div className="text-center bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-lg font-semibold text-yellow-300 mb-2">
              🎯 Each tool below includes specific earning strategies and real income examples
            </div>
            <p className="text-yellow-200 text-sm">
              We'll show you exactly how we use these tools to earn $200k+/year - same strategies, same results!
            </p>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`p-4 rounded-lg border transition-all text-left ${
              selectedCategory === category.id
                ? 'bg-blue-600/30 border-blue-500/50 text-blue-200'
                : 'bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-700/50'
            }`}
          >
            <div className="text-2xl mb-2">{category.icon}</div>
            <h3 className="font-semibold mb-1">{category.name}</h3>
            <p className="text-sm opacity-75">{category.description}</p>
            <div className="text-xs mt-2 opacity-60">
              {getToolsByCategory(category.id).length} tools
            </div>
          </button>
        ))}
      </div>

      {/* Tools Display */}
      {selectedCategory ? (
        <div>
          <h3 className="text-3xl font-bold text-white mb-6">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getToolsByCategory(selectedCategory).map((tool: AffiliatePartner) => (
              <AffiliateToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-3xl font-bold text-white mb-6">All Professional Tools</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {AFFILIATE_PARTNERS
              .sort((a: AffiliatePartner, b: AffiliatePartner) => (a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0))
              .map((tool: AffiliatePartner) => (
                <AffiliateToolCard key={tool.id} tool={tool} />
              ))}
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Affiliate Configuration</h2>
              <button
                onClick={() => setShowConfig(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Configuration Notice</h3>
                <p className="text-gray-300 text-sm">
                  Affiliate IDs are centrally managed in <code className="bg-gray-700 px-2 py-1 rounded text-xs">src/lib/affiliate-config.ts</code>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Current Affiliate IDs</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(AFFILIATE_CONFIG.ids).map(([platform, id]) => (
                      <div key={platform} className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                        <span className="text-gray-300 capitalize">{platform}:</span>
                        <code className="text-green-400">{id}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">UTM Parameters</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(AFFILIATE_CONFIG.utm).map(([param, value]) => (
                      <div key={param} className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                        <span className="text-gray-300">{param}:</span>
                        <code className="text-blue-400">{value}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">📝 How to Update Affiliate IDs</h4>
                <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                  <li>Open <code className="bg-gray-700 px-1 rounded text-xs">src/lib/affiliate-config.ts</code></li>
                  <li>Update the IDs in the <code className="bg-gray-700 px-1 rounded text-xs">AFFILIATE_CONFIG.ids</code> object</li>
                  <li>Save the file - all components will automatically use the new IDs</li>
                  <li>Test links to ensure they're working correctly</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclosure Modal */}
      {showDisclosure && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Affiliate Partnership Transparency</h2>
              <button
                onClick={() => setShowDisclosure(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                <strong className="text-blue-400">Our Mission:</strong> Keep world-class developer education completely free forever.
              </p>
              
              <p>
                <strong className="text-green-400">How We Do It:</strong> We partner with the exact same professional tools you'll use in your career. When you naturally progress from learning to professional work, we earn small commissions that fund our free education platform.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Our Promises:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ <strong>Earn with the same tools we use:</strong> Every tool helped us build our $200k+/year business</li>
                  <li>✅ <strong>Free learning guaranteed:</strong> All tutorials work with free tiers before you earn money</li>
                  <li>✅ <strong>Real money-making potential:</strong> We'll show you how to earn $50k+ with these exact tools</li>
                  <li>✅ <strong>Full transparency:</strong> We use affiliate links, but only for tools that make us money</li>
                  <li>✅ <strong>Your success = our success:</strong> When you earn money, we earn a small commission</li>
                </ul>
              </div>

              <p className="text-sm text-gray-400">
                Questions about earning money with these tools? Email us at affiliate@rockitcode.com<br/>
                <span className="text-green-400">We'll show you exactly how we use these tools to generate income!</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
