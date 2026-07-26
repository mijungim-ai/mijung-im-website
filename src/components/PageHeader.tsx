export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="pt-16">
      <div className="mx-auto max-w-6xl px-6 py-28 border-b border-hairline">
        <h1 className="display-serif text-h1 text-ivory">{title}</h1>
        {subtitle && (
          <p className="display-serif text-h2 text-grey-muted mt-3">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
