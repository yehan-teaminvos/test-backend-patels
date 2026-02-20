// ─── Cloudflare R2 Image Helper ───
// All static images are stored in R2 bucket: petals-assets
// Use this to get the full public URL for any image

export const R2_BASE_URL = "https://pub-708b43c93ac047cda95d8fca43011c2c.r2.dev";

/**
 * Returns the full R2 URL for a given image path
 * Example: r2img("/home/flower1.avif")
 *       => "https://pub-xxx.r2.dev/home/flower1.avif"
 */
export function r2img(path: string): string {
  // Strip leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${R2_BASE_URL}/${cleanPath}`;
}
