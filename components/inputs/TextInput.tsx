import { ChangeEvent, KeyboardEvent } from 'react';

export default function TextInput({
	className = '',
	type = 'text',
	value,
	placeholder = '',
	onChange,
	numberOnly = false
}: {
	className?: string;
	type?: string;
	value: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	numberOnly?: boolean;
}) {
	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (numberOnly && !/[0-9]/.test(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<input
			className={`focus:border-primary rounded border-2 border-neutral-700 bg-white px-2 py-1 text-black transition duration-300 focus:outline-none ${className}`}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			onKeyPress={onKeyPress}
		/>
	);
}
