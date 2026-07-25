export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="pt-16">
      <div className="mx-auto max-w-6xl px-6 py-20 border-b border-hairline">
        <p className="label text-xs text-sage mb-3">{eyebrow}</p>
        <h1 className="display-serif text-h1 text-ivory">{title}</h1>
        {subtitle && (
          <p className="display-serif text-h2 text-grey-muted mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
