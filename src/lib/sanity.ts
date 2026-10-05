// Reads the menu and photos from Sanity at build time. The owner edits them at https://luy.sanity.studio,
// and publishing there triggers a rebuild. If Sanity can't be reached the build fails, so the live site
// keeps its last good version instead of going out with missing prices.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanity = createClient({
  projectId: 'qo3wi0jo',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false, // always the latest published content at build time
});

const builder = createImageUrlBuilder(sanity);

export type SanityPhoto = {
  asset?: { _ref: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

/** Responsive image attributes for a Sanity photo: CDN URLs in WebP/AVIF, sized for `widths`. */
export function photoAttrs(photo: SanityPhoto, widths = [400, 800, 1200]) {
  // Asset refs look like image-<id>-<width>x<height>-<ext>
  const [, w, h] = photo.asset!._ref.match(/-(\d+)x(\d+)-/)!.map(Number);
  const url = (width: number) => builder.image(photo).width(width).auto('format').quality(80).url();
  const { x = 0.5, y = 0.5 } = photo.hotspot ?? {};
  return {
    src: url(widths[1] ?? widths[0]),
    srcset: widths.filter((width) => width <= w).concat(w < widths[0] ? [w] : []).map((width) => `${url(width)} ${width}w`).join(', '),
    width: w,
    height: h,
    // Keep the owner's chosen focal point when the photo is cropped to fit its frame.
    style: `object-position: ${x * 100}% ${y * 100}%`,
  };
}

export const hasPhoto = (p?: SanityPhoto | null): p is SanityPhoto => !!p?.asset?._ref;
