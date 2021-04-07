import { FC } from 'react';
import { default as cn } from 'classnames';

type IFlexProps = {
	centerContent?: boolean;
	className?: string;
	onClick?: () => void;
	ref?: any;
};
let i = 0;
export const Flex: FC<IFlexProps> = ({
	children,
	centerContent = false,
	className = '',
	onClick,
	ref,
}) => {
	return (
		<div
			ref={ref}
			onClick={onClick}
			className={cn('flex', className, { 'items-center justify-center': centerContent })}
		>
			{children}
		</div>
	);
};

export const FlexRow: FC<IFlexProps> = ({
	children,
	centerContent = false,
	className = '',
	onClick,
	ref,
}) => {
	return (
		<div
			ref={ref}
			onClick={onClick}
			className={cn('flex flex-row', className, {
				'items-center justify-center': centerContent,
			})}
		>
			{children}
		</div>
	);
};

export const FlexCol: FC<IFlexProps> = ({
	children,
	centerContent = false,
	className = '',
	onClick,
	ref,
}) => {
	return (
		<div
			ref={ref}
			onClick={onClick}
			className={cn('flex flex-col', className, {
				'items-center justify-center': centerContent,
			})}
		>
			{children}
		</div>
	);
};
