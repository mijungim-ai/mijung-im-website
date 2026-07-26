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
  },
};

export default withNextIntl(nextConfig);
