// Custom Decap CMS preview templates. Loaded via <script type="text/babel">
// in admin/index.html — Babel Standalone transpiles this file's JSX in the
// browser at request time, so no bundler is needed for the admin setup.
//
// Each template mirrors the *real* site component's markup/Tailwind classes
// as closely as practical (see src/components/DetailModal.tsx,
// MediaTabs.tsx, ProjectGallery.tsx, LinkEntry.tsx) so the editor's live
// preview reads like the actual popup/list row, not a generic form dump.
// Styling comes from /admin/preview.css — registered via
// CMS.registerPreviewStyle() in admin/index.html, not here — which is
// built from src/app/[locale]/preview-entry.css by `npm run
// build:preview-css` (see package.json). That entry point re-exports
// globals.css AND widens the Tailwind scan to include this file, so a
// class used only here (not in any real src/ component) still makes it
// into the compiled CSS — see preview-entry.css's own comment for why
// that extra @source line exists.
//
// All 9 boards are now registered, via 4 shared components:
//   - DetailCardPreview   → home_news, essays, engagements, concert_archive
//   - VideoEmbedPreview   → videos_performances, videos_talks
//   - GalleryThumbPreview → media_gallery, projects_gallery
//   - LinkRowPreview      → press_articles
//
// Fonts are left as system fallbacks — the real site's next/font-loaded
// families aren't available inside this standalone admin page (a later,
// separate step).

// DetailCardPreview — mirrors DetailModal.tsx (and ConcertArchiveModal.tsx,
// which shares the same card markup). The 4 collections it covers don't
// all use the same field names for the same concept — home_news/essays
// use "date"+"body", engagements uses "dateLabel"+"content", concert_
// archive uses "date"+"content" — so each concept is read from whichever
// field name is actually present, and every field is optional: a
// collection that doesn't define a field (e.g. home_news has no
// location/link) simply never shows that part, no per-collection branching
// needed.
function DetailCardPreview({ entry, getAsset }) {
  var title = entry.getIn(["data", "title"]);
  var date = entry.getIn(["data", "date"]) || entry.getIn(["data", "dateLabel"]);
  var location = entry.getIn(["data", "location"]);
  var body = entry.getIn(["data", "body"]) || entry.getIn(["data", "content"]);
  var image = entry.getIn(["data", "image"]);
  var link = entry.getIn(["data", "link"]);
  var linkHref = link && typeof link.get === "function" ? link.get("href") : null;
  var linkLabel = link && typeof link.get === "function" ? link.get("label") : null;

  return (
    <div className="bg-ink w-full max-w-2xl overflow-hidden">
      <div className="p-6 sm:p-8">
        {image && (
          // Sized larger than the real popup's own thumbnail
          // (max-w-[200px]) on purpose — see preview-entry.css's comment
          // for how a preview-only class like this still gets built.
          <div className="photo-frame relative w-full max-w-[600px] aspect-[4/3] overflow-hidden mb-6">
            <img
              src={getAsset(image)}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}
        {date && <p className="label text-xs text-sage mb-2">{date}</p>}
        <h3 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-4">
          {title}
        </h3>
        {location && <p className="text-body text-ivory/90">{location}</p>}
        {body && (
          <p className="text-body text-ivory/70 mt-1 whitespace-pre-line">
            {body}
          </p>
        )}
        {linkHref && (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-xs text-sage hover:text-ivory transition-colors mt-4 inline-block"
          >
            {linkLabel} →
          </a>
        )}
      </div>
    </div>
  );
}

// VideoEmbedPreview — mirrors MediaTabs.tsx's video item markup. Embeds
// the real YouTube iframe (not a static thumbnail/link) rather than
// re-hosting one specific video the way the real card does — a single
// iframe in an admin-only preview pane is not meaningfully heavy, and
// seeing it actually play is the most direct way for an editor to catch
// a bad/mistyped embedUrl before publishing.
function VideoEmbedPreview({ entry }) {
  var title = entry.getIn(["data", "title"]);
  var body = entry.getIn(["data", "body"]);
  var embedUrl = entry.getIn(["data", "embedUrl"]);

  return (
    <div className="bg-ink w-full max-w-2xl overflow-hidden p-6 sm:p-8">
      {embedUrl && (
        <div className="aspect-video mb-4">
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title={title || "Video"}
            loading="lazy"
            allowFullScreen
          />
        </div>
      )}
      {title && (
        <h4 className="font-sans font-bold text-[22px] text-ivory mb-3">
          {title}
        </h4>
      )}
      {body && <p className="text-body text-ivory/90">{body}</p>}
    </div>
  );
}

// GalleryThumbPreview — mirrors the photo-frame + caption tile used by
// both MediaTabs.tsx's gallery tab and ProjectGallery.tsx. Sized well
// past Decap's own bare default image preview, but deliberately smaller
// than DetailCardPreview's 600px — these are grid tiles on the real site,
// not a single hero image, so a ~300px tile reads closer to how one photo
// actually sits among many.
function GalleryThumbPreview({ entry, getAsset }) {
  var caption = entry.getIn(["data", "caption"]);
  var image = entry.getIn(["data", "image"]);

  return (
    <div className="bg-ink w-full max-w-2xl overflow-hidden p-6 sm:p-8">
      {image && (
        <div className="photo-frame relative w-full max-w-[300px] aspect-[4/3] overflow-hidden">
          <img
            src={getAsset(image)}
            alt={caption}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      {caption && (
        <p className="text-caption text-grey-muted mt-2.5 max-w-[300px]">
          {caption}
        </p>
      )}
    </div>
  );
}

// LinkRowPreview — mirrors LinkEntry.tsx's row exactly (title + external
// link affordance). Decap's default fallback preview for a template-less
// collection just dumps each field as a raw labeled line, which wouldn't
// show the sage/hover row styling or read anything like the actual list
// — and the row is simple enough that a custom template costs only a few
// lines, so it's worth having despite the plain title+url data. The URL
// is also shown (unlike the real row's icon-only affordance) since
// confirming the actual destination is the one thing worth previewing
// here.
function LinkRowPreview({ entry }) {
  var title = entry.getIn(["data", "title"]);
  var url = entry.getIn(["data", "url"]);

  return (
    <div className="bg-ink w-full max-w-2xl overflow-hidden p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4 border-b border-hairline py-4 text-ivory/90">
        <span className="text-body">{title}</span>
        {url && (
          <span className="text-caption text-grey-muted shrink-0">
            {url} ↗
          </span>
        )}
      </div>
    </div>
  );
}

CMS.registerPreviewTemplate("home_news", DetailCardPreview);
CMS.registerPreviewTemplate("essays", DetailCardPreview);
CMS.registerPreviewTemplate("engagements", DetailCardPreview);
CMS.registerPreviewTemplate("concert_archive", DetailCardPreview);

CMS.registerPreviewTemplate("videos_performances", VideoEmbedPreview);
CMS.registerPreviewTemplate("videos_talks", VideoEmbedPreview);

CMS.registerPreviewTemplate("media_gallery", GalleryThumbPreview);
CMS.registerPreviewTemplate("projects_gallery", GalleryThumbPreview);

CMS.registerPreviewTemplate("press_articles", LinkRowPreview);
