import { ReactNode } from 'react';

export default function IconButton({
	className = '',
	title = '',
	children,
	onClick
}: {
	className?: string;
	title?: string;
	children: ReactNode;
	onClick?: () => void;
}) {
	return (
		<button
			title={title}
			className={`hover:bg-primary flex items-center justify-center rounded p-1 transition-colors ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
