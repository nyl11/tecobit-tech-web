import React from 'react'
import { Media } from '@/components/Media'
import type { Page, Media as MediaType } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Linkedin, Github, Twitter, Facebook, Instagram } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

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
    const payload = await getPayload({ config })
    const { docs: teamMembers } = await payload.find({
      collection: 'team-members',
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
        <Reveal>
          <div className="max-w-3xl mb-16 mx-auto">
            {title && (
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-6 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto font-light">
                {subtitle}
              </p>
            )}
            <div className="w-24 h-1 bg-primary mt-8 rounded-full mx-auto" />
          </div>
        </Reveal>

        {displayMembers && displayMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {displayMembers.map((member, idx: number) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group relative flex flex-col items-center">
                  <div className="relative aspect-4/5 w-full mb-8 overflow-hidden rounded-2xl bg-surface shadow-md transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                    {member.image && (
                      <Media
                        resource={member.image}
                        imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-heading/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="flex gap-3">
                        {member.socialLinks?.map((link, i) => {
                          const Icon = getSocialIcon(link.platform)
                          if (!Icon) return null
                          return (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-primary transition-all p-2.5 bg-white/10 hover:bg-white rounded-none shadow-sm"
                            >
                              <Icon size={18} />
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold tracking-wide uppercase text-xs mb-3">
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="text-muted text-sm leading-relaxed mb-6 max-w-xs font-light">
                      {member.bio}
                    </p>
                  )}
                  <div className="w-8 h-0.5 bg-border/40 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-xl border border-dashed border-border/60">
            <p className="text-muted text-lg italic font-light">No team members to display yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
