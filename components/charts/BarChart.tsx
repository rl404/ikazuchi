import ChartTooltip from './ChartTooltip';
import { compactInt } from '@/libs/utils';
import { Bar, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart as BChart } from 'recharts';

type Data = {
	label: string;
	value: number;
	color?: string;
};

type Config = {
	valueName: string;
};

export default function BarChart({ data, config }: { data: Data[]; config: Config }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BChart data={data}>
				<Tooltip content={ChartTooltip} cursor={{ fill: 'white', opacity: 0.2 }} />
				<CartesianGrid strokeDasharray="5 5" stroke="white" strokeOpacity={0.3} />
				<XAxis dataKey="label" stroke="white" />
				<YAxis dataKey="value" stroke="white" tickFormatter={(v) => compactInt(v)} />
				<Bar dataKey="value" name={config.valueName}>
					{data.map((v, i) => (
						<Cell key={`cell-${i}`} fill={v.color || 'white'} />
					))}
				</Bar>
			</BChart>
		</ResponsiveContainer>
	);
}
