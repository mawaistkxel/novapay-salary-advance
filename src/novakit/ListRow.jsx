/**
 * ListRow / TransactionRow — NovaKit Lite
 * leading icon · title + subtitle · trailing amount
 * Divider: hard-coded #DADADA replaced with the neutral-300 token.
 * Subtitle: neutral-500 (3.95:1, fails AA at 13px) -> neutral-700 (8.45:1).
 */
export default function ListRow({
  icon = null,
  title,
  subtitle,
  trailing = null,
  className = "",
}) {
  return (
    <div
      className={
        "flex items-center gap-3 py-3 border-b border-neutral-300 last:border-b-0 " +
        className
      }
    >
      {icon ? (
        <div className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
          {icon}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="text-body text-neutral-900 truncate">{title}</div>
        {subtitle ? (
          <div className="text-caption text-neutral-700 truncate">{subtitle}</div>
        ) : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}
