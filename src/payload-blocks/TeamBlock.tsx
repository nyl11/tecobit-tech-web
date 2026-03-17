import React from 'react'
import { Media } from '@/components/Media'
import type { Page, Media as MediaType } from '@/payload-types'
import { fetchCollection } from '@/utilities/payload-fetch'
import { Linkedin, Github, Twitter, Facebook, Instagram } from 'lucide-react'

type TeamBlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'team' }>

interface DisplayMember {
  name: string
  position: string
  bio?: string | null
  image?: string | MediaType | null
  socialLinks?:
    | {
        platform: 'linkedin' | 'github' | 'twitter' | 'facebook' | 'instagram'
        url: string
      }[]
    | null
}

export const TeamBlock = async ({
  title,
  subtitle,
  populateFrom,
  members: manualMembers,
}: TeamBlockProps) => {
  let displayMembers: DisplayMember[] = []

  if (populateFrom === 'team') {
    const { docs: teamMembers } = await fetchCollection('team-members', {
      limit: 100,
      sort: 'createdAt',
    })

    displayMembers = teamMembers.map((member) => ({
      name: member.name,
      position: member.position,
      image: member.image,
      socialLinks: member.socialLinks,
      bio: member.bio,
    }))
  } else {
    displayMembers = (manualMembers as DisplayMember[]) || []
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return Linkedin
      case 'github':
        return Github
      case 'twitter':
        return Twitter
      case 'facebook':
        return Facebook
      case 'instagram':
        return Instagram
      default:
        return null
    }
  }

  return (
    <section className="py-24 bg-background overflow-hidden text-center">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mb-20 mx-auto">
          {title && (
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-6 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
          )}
          <div className="w-20 h-1.5 bg-primary mt-8 rounded-full mx-auto" />
        </div>

        {displayMembers && displayMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {displayMembers.map((member, idx: number) => (
              <div key={idx} className="group relative flex flex-col items-center">
                <div className="relative aspect-4/5 w-full mb-8 overflow-hidden rounded-2xl bg-surface shadow-md transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                  {member.image && (
                    <Media
                      resource={member.image}
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-heading/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                    <div className="flex gap-4">
                      {member.socialLinks?.map((link, i) => {
                        const Icon = getSocialIcon(link.platform)
                        if (!Icon) return null
                        return (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md"
                          >
                            <Icon size={20} />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">
                  {member.position}
                </p>
                {member.bio && (
                  <p className="text-body text-sm leading-relaxed mb-6 max-w-xs">{member.bio}</p>
                )}
                <div className="w-10 h-0.5 bg-border group-hover:w-full group-hover:bg-primary transition-all duration-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-3xl border-2 border-dashed border-border">
            <p className="text-body text-lg italic">No team members to display yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
