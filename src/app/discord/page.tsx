import { redirect } from 'next/navigation'

export default function DiscordPage() {
  // Redirect to actual Discord invite
  redirect('https://discord.gg/rockitcode')
}
