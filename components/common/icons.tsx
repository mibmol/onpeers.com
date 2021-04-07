import { FC, memo } from 'react';

export type ISvgProps = {
	className?: string;
	sizes?: string; // tailwind w-{n} and h-{n} classes
	stroke?: string;
	strokeWidth?: number;
	fill?: string;
	size?: 'medium' | 'small';
};

export const ChevronLeft: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			viewBox="0 0 24 24"
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`${sizes} ${className}`}
		>
			<polyline points="15 18 9 12 15 6"></polyline>
		</svg>
	),
);

export const ChevronRight: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			viewBox="0 0 24 24"
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`${sizes} ${className}`}
		>
			<path d="M9 18L15 12L9 6" />
		</svg>
	),
);

export const ChevronDown: FC<ISvgProps>=({className = '',
sizes = 'w-6 h-6',
stroke = 'currentColor',
strokeWidth = 2,
fill = 'none',})=> (
	<svg
		viewBox="0 0 24 24"
		fill={fill}
		stroke={stroke}
		strokeWidth={strokeWidth}
		strokeLinecap="round"
		strokeLinejoin="round"
		className={`${sizes} ${className}`}
	>
		<path d="M19 9l-7 7-7-7" />
	</svg>
)

type ISpinner = {
	color?: string;
	size?: string;
	animating?: boolean;
};
export const TWSpinner: FC<ISpinner> = memo(
	({ color = 'text-blue-500', size = 'w-8 h-8', animating = false }) => {
		return (
			<svg
				className={`${animating && 'animate-spin'} ${size} ${color}`}
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				></circle>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		);
	},
);

export const Pencil: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => {
		return (
			<svg
				fill={fill}
				viewBox="0 0 24 24"
				stroke={stroke}
				className={`${sizes} ${className}`}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={strokeWidth}
					d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
				/>
			</svg>
		);
	},
);

export const PencilAlt: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
			className={`${sizes} ${className}`}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
			/>
		</svg>
	),
);

export const CloseIcon: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	),
);

export const PlusIcon: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M12 6v6m0 0v6m0-6h6m-6 0H6"
			/>
		</svg>
	),
);

export const PlusCircleIcon: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
);

export const MinusIcon: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M18 12H6"
			/>
		</svg>
	),
);

export const ClockIcon: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
);

export const GlobeIcon: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
			/>
		</svg>
	),
);

export const ArrowNarrowRight: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M17 8l4 4m0 0l-4 4m4-4H3"
			/>
		</svg>
	),
);

export const CalendarIcon: FC<ISvgProps> = memo(
	({
		className = '',
		sizes = 'w-6 h-6',
		stroke = 'currentColor',
		strokeWidth = 2,
		fill = 'none',
	}) => (
		<svg
			className={`${sizes} ${className}`}
			fill={fill}
			viewBox="0 0 24 24"
			stroke={stroke}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
			/>
		</svg>
	),
);
