import ImageIcon from './icons/ImageIcon';
import LinkSlashIcon from './icons/LinkSlashIcon';
import { useEffect, useState } from 'react';

export default function IkzImage({
	className,
	src,
	alt,
	onClick
}: {
	className?: string;
	src: string;
	alt: string;
	onClick?: () => void;
}) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);

		if (src === '') {
			setLoading(false);
			setError(true);
			return;
		}

		const img = new Image();
		img.src = src;

		img.onload = () => {
			setLoading(false);
		};

		img.onerror = () => {
			setLoading(false);
			setError(true);
		};
	}, [src]);

	if (loading) {
		return (
			<div className={`flex animate-pulse items-center justify-center bg-neutral-600 ${className}`}>
				<ImageIcon className="w-1/4" />
			</div>
		);
	}

	if (src === '' || error) {
		return (
			<div
				className={`flex items-center justify-center bg-neutral-600 ${className}`}
				title="error image"
			>
				<LinkSlashIcon className="w-1/4" />
			</div>
		);
	}

	return <img src={src} alt={alt} className={className} onClick={onClick} />;
}
