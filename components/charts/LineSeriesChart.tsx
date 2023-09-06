import ChartTooltip from "./ChartTooltip";
import { compactInt } from "@/libs/utils";
import {
  CartesianGrid,
  LineChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

type Data = {
  name: string;
  color?: string;
  values: {
    label: string;
    value: number;
  }[];
};

type Config = {
  syncID?: string;
  allowDecimal?: boolean;
};

export default function LineSeriesChart({
  data,
  config,
}: {
  data: Data[];
  config: Config;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart syncId={config.syncID}>
        <Tooltip
          content={ChartTooltip}
          cursor={{ fill: "white", opacity: 0.2 }}
        />
        <CartesianGrid
          strokeDasharray="5 5"
          stroke="white"
          strokeOpacity={0.3}
        />
        <XAxis dataKey="label" stroke="white" allowDuplicatedCategory={false} />
        <YAxis
          dataKey="value"
          stroke="white"
          tickFormatter={(v) => compactInt(v)}
          interval="preserveStartEnd"
          allowDecimals={config.allowDecimal}
        />
        <Legend />
        {data.map((s) => (
          <Line
            dataKey="value"
            data={s.values}
            name={s.name}
            key={s.name}
            type="monotone"
            stroke={s.color || "white"}
            strokeWidth={2}
            dot={<></>}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
