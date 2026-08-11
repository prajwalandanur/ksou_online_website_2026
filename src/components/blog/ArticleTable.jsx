export function ArticleTable({ headers, rows, caption }) {
  return (
    <div className="overflow-x-auto rounded-[20px] border border-border/80">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-primary">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground first:rounded-tl-[20px] last:rounded-tr-[20px]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? 'bg-muted/40' : 'bg-white'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3.5 align-top text-foreground/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
