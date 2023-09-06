import ChartTooltip from "./ChartTooltip";
import { compactInt } from "@/libs/utils";
import {
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LineChart as LChart } from "recharts";
import { AxisDomain } from "recharts/types/util/types";

type Data = {
  label: string;
  value1: number | null;
  value2?: number | null;
};

type Config = {
  syncID?: string;
  value1: {
    name?: string;
    reversed?: boolean;
    color?: string;
    domain?: AxisDomain;
    allowDecimal?: boolean;
  };
  value2?: {
    name?: string;
    reversed?: boolean;
    color?: string;
    domain?: AxisDomain;
    allowDecimal?: boolean;
  };
};

export default function LineChart({
  data,
  config,
}: {
  data: Data[];
  config: Config;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LChart data={data} syncId={config.syncID}>
        <Tooltip
          content={ChartTooltip}
          cursor={{ fill: "white", opacity: 0.2 }}
        />
        <CartesianGrid
          strokeDasharray="5 5"
          stroke="white"
          strokeOpacity={0.3}
        />
        <XAxis dataKey="label" stroke="white" />
        <YAxis
          yAxisId="left"
          stroke="white"
          reversed={config.value1.reversed}
          tickFormatter={(v) => compactInt(v)}
          domain={config.value1.domain}
          interval="preserveStartEnd"
          allowDecimals={config.value1.allowDecimal}
        />
        {config.value2 && (
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="white"
            reversed={config.value2.reversed}
            tickFormatter={(v) => compactInt(v)}
            domain={config.value2.domain}
            interval="preserveStartEnd"
            allowDecimals={config.value2.allowDecimal}
          />
        )}
        <Legend />
        <Line
          yAxisId="left"
          dataKey="value1"
          type="monotone"
          name={config.value1.name}
          stroke={config.value1.color || "white"}
          strokeWidth={2}
          dot={<></>}
        />
        {config.value2 && (
          <Line
            yAxisId="right"
            dataKey="value2"
            type="monotone"
            name={config.value2.name}
            stroke={config.value2.color || "white"}
            strokeWidth={2}
            dot={<></>}
          />
        )}
      </LChart>
    </ResponsiveContainer>
  );
}
