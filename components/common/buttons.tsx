import { FC, memo, ReactNode, useCallback } from 'react';
import { TWSpinner } from './icons';
import { default as cn } from 'classnames';

type IButtonProps = {
	text?: string;
	icon?: ReactNode;
	iconPos?: 'left' | 'right';
	loading?: boolean;
	className?: string;
	onClick?: (e: any) => void;
	ariaLabel?: string;
};

export const spin = (
	<div className="absolute-fit">
		<TWSpinner size="w-4 h-4" color="text-blue-300" animating />
	</div>
);

export const Button: FC<IButtonProps> = memo(
	({
		text = 'button',
		className,
		icon = null,
		loading = false,
		iconPos = 'left',
		ariaLabel = 'button',
		onClick = () => {},
	}) => {
		const handleFn = useCallback((e) => {
			if (loading) return;
			onClick(e);
		}, []);
		return (
			<button
				onClick={handleFn}
				aria-label={ariaLabel}
				className={`relative items-center h-9 rounded-md font-bold transition duration-100 ${className}`}
			>
				{loading && spin}
				<div
					className={cn('flex-row-center z-20', {
						'opacity-0': loading,
					})}
				>
					{icon && iconPos === 'left' && icon}
					<span className={cn({ 'ml-2': !!icon })}>{text}</span>
					{icon && iconPos === 'right' && icon}
				</div>
			</button>
		);
	},
);

export const IconButton: FC<IButtonProps & { roundClass?: string }> = memo(
	({
		icon,
		onClick,
		className = '',
		ariaLabel = 'button',
		roundClass = 'rounded-full',
	}) => (
		<button
			onClick={onClick}
			className={`flex p-2 font-bold transition duration-100 btn-def ${roundClass} ${className}`}
			aria-label={ariaLabel}
		>
			{icon}
		</button>
	),
);
