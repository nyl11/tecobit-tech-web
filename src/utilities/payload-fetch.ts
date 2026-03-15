import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Config } from '../payload-types';

type CollectionSlug = keyof Config['collections'];
type GlobalSlug = keyof Config['globals'];

interface FetchCollectionParams {
  depth?: number;
  limit?: number;
  page?: number;
  where?: Record<string, unknown>;
  sort?: string;
  [key: string]: unknown;
}

export async function fetchCollection<T extends CollectionSlug>(
  slug: T,
  params?: FetchCollectionParams
): Promise<{ docs: Config['collections'][T][], [key: string]: unknown }> {
  const payload = await getPayload({ config: configPromise });
  
  const result = await payload.find({
    collection: slug,
    depth: params?.depth ?? 10,
    limit: params?.limit,
    page: params?.page,
    where: params?.where,
    sort: params?.sort,
  } as unknown as Parameters<typeof payload.find>[0]);
  
  return result as unknown as { docs: Config['collections'][T][], [key: string]: unknown };
}

export async function fetchGlobal<T extends GlobalSlug>(
  slug: T
): Promise<Config['globals'][T]> {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.findGlobal({
    slug,
  } as unknown as Parameters<typeof payload.findGlobal>[0]);
  
  return result as unknown as Config['globals'][T];
}
