import { getTooltipValue } from '@/libs/utils';
import { TooltipContentProps } from 'recharts';

export default function ChartTooltip({ active, payload, label }: TooltipContentProps<any, any>) {
	if (!(active && payload && payload.length)) return;
	return (
		<div className="grid border border-neutral-600 bg-black p-2 text-center">
			<div>{label}</div>
			{payload.map((p) => (
				<div key={p.name}>
					{`${p.name} : ${getTooltipValue(p)}`}
				</div>
			))}
		</div>
	);
}
