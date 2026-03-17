import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import type { Config } from '@/payload-types'

type CollectionSlug = keyof Config['collections']
type GlobalSlug = keyof Config['globals']

export async function fetchCollection<T extends CollectionSlug>(
  slug: T,
  options?: {
    where?: Record<string, unknown>
    limit?: number
    sort?: string
    depth?: number
  },
) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: slug,
    where: options?.where as Where,
    limit: options?.limit,
    sort: options?.sort,
    depth: options?.depth ?? 2,
  })

  return result
}

export async function fetchGlobal<T extends GlobalSlug>(slug: T) {
  const payload = await getPayload({ config })

  const result = await payload.findGlobal({
    slug,
    depth: 2,
  })

  return result
}
