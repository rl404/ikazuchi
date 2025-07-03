import { TooltipContentProps,  } from "recharts";

export default function ChartTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<any, any>) {
  if (!(active && payload && payload.length)) return;
  return (
    <div className="grid border border-neutral-600 bg-black p-2 text-center">
      <div>{label}</div>
      {payload.map((p) => (
        <div key={p.name}>
          {`${p.name} : `}
          {typeof p.value === "string"
            ? p.value
            : !p.value
            ? 0
            : p.value % 1 != 0
            ? p.value.toFixed(2).toLocaleString()
            : p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
}
