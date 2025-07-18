'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/UserContext'

interface Sponsor {
  id: string
  name: string
  logo: string
  website?: string
  tier: 'basic' | 'premium' // $50/mo basic, $100/mo premium
  isActive: boolean
  joinedDate: string
  lastPayment?: string
  monthlyAmount: number // $50 for basic, $100 for premium
}

export default function SponsorManager() {
  const { user } = useAuth()
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Check if user is admin (you'll need to implement this logic)
  const isAdmin = user?.id === 'admin-user-id' // Replace with actual admin check

  useEffect(() => {
    loadSponsors()
  }, [])

  const loadSponsors = async () => {
    try {
      // This would be your actual API call
      // const response = await fetch('/api/sponsors')
      // const data = await response.json()
      
      // Mock data for now
      const mockSponsors: Sponsor[] = [
        {
          id: '1',
          name: 'TechCorp Industries',
          logo: '/api/placeholder/200/100',
          website: 'https://techcorp.com',
          tier: 'premium',
          isActive: true,
          joinedDate: '2024-01-15',
          lastPayment: '2024-07-01',
          monthlyAmount: 100
        },
        {
          id: '2',
          name: 'Learning Foundation',
          logo: '/api/placeholder/200/100',
          website: 'https://learningfound.org',
          tier: 'basic',
          isActive: true,
          joinedDate: '2024-02-10',
          lastPayment: '2024-07-01',
          monthlyAmount: 50
        }
      ]
      
      setSponsors(mockSponsors)
    } catch (error) {
      console.error('Error loading sponsors:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSponsorStatus = async (sponsorId: string) => {
    try {
      // API call to toggle status
      // await fetch(`/api/sponsors/${sponsorId}/toggle`, { method: 'POST' })
      
      setSponsors(prev => prev.map(sponsor => 
        sponsor.id === sponsorId 
          ? { ...sponsor, isActive: !sponsor.isActive }
          : sponsor
      ))
    } catch (error) {
      console.error('Error toggling sponsor status:', error)
    }
  }

  const deleteSponsor = async (sponsorId: string) => {
    if (!confirm('Are you sure you want to remove this sponsor?')) return
    
    try {
      // API call to delete
      // await fetch(`/api/sponsors/${sponsorId}`, { method: 'DELETE' })
      
      setSponsors(prev => prev.filter(sponsor => sponsor.id !== sponsorId))
    } catch (error) {
      console.error('Error deleting sponsor:', error)
    }
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Access denied. Admin privileges required.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        <p className="text-slate-400 mt-2">Loading sponsors...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sponsor Management</h1>
          <p className="text-slate-400">Manage sponsor logos and display settings • Basic $50/mo (sponsors page only) • Premium $100/mo (site-wide)</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Add Sponsor
        </button>
      </div>

      {/* Sponsors Grid */}
      <div className="grid gap-6">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className={`p-6 rounded-xl border transition-all ${
              sponsor.isActive 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-slate-800/30 border-slate-700/30 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Logo Preview */}
                <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-slate-600/30">
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `<span class="text-slate-400 text-xs">${sponsor.name}</span>`
                    }}
                  />
                </div>
                
                {/* Sponsor Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white">{sponsor.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      sponsor.tier === 'premium' 
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'bg-green-600/20 text-green-400'
                    }`}>
                      {sponsor.tier} • ${sponsor.monthlyAmount}/month
                    </span>
                    <span>Joined: {new Date(sponsor.joinedDate).toLocaleDateString()}</span>
                    {sponsor.lastPayment && (
                      <span>Last payment: {new Date(sponsor.lastPayment).toLocaleDateString()}</span>
                    )}
                  </div>
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm underline"
                    >
                      {sponsor.website}
                    </a>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSponsorStatus(sponsor.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    sponsor.isActive
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                      : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                  }`}
                >
                  {sponsor.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => deleteSponsor(sponsor.id)}
                  className="px-3 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sponsors.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-700/50 rounded-xl">
          <p className="text-slate-400 mb-4">No sponsors yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add Your First Sponsor
          </button>
        </div>
      )}

      {/* Automated Logo Removal Notice */}
      <div className="mt-8 p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
        <h4 className="text-yellow-400 font-medium mb-2">Automated Logo Management</h4>
        <p className="text-sm text-yellow-200/80">
          Sponsor logos are automatically removed when payments stop. 
          Last payment dates are tracked and logos hidden after 30 days of non-payment.
        </p>
      </div>
    </div>
  )
}
