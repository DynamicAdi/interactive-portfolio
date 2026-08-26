export function Marker({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="mb-12 flex items-baseline justify-between border-b border-border pb-3">
      <div className="flex items-baseline gap-4">
        <span className="mono text-[11px] text-primary">[{index}]</span>
        <span className="mono text-[11px] text-foreground">{title}</span>
      </div>
      {note ? <span className="mono hidden text-[10px] text-muted-foreground md:block">{note}</span> : null}
    </div>
  );
}
