import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Default deviceSizes jumps 2048 -> 3840 (the largest gap in the
    // array), so retina viewports needing ~2200-3000px get served the
    // full 3840 bucket. Adding 2560 fills that gap; measured effect
    // confirmed on dmz_dome_beach.jpg (3891px) and the NYT press photo
    // (3000px) — both currently degrade to a much larger transfer at
    // w=3840 than a 2560 variant would need.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // Next 16 defaults to only serving quality 75; the Lightbox requests
    // 85, so it must be added or Next silently coerces it back to 75.
    qualities: [75, 85],
    // next/image refuses to optimize a src on a host that isn't
    // explicitly allowed here — an editor pasting an external image
    // URL into a CMS image field (instead of uploading a file, which
    // is what media_folder/public_folder in config.yml expect) breaks
    // as a plain broken-image icon otherwise. This is a safety net for
    // that case, not the fix for it — the content itself should still
    // move to an uploaded file where practical.
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
  },
};

export default withNextIntl(nextConfig);
