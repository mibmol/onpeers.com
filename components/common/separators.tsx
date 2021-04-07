import { FC, memo } from 'react';

export const VSeparator: FC<{ className?: string }> = ({ className = 'h-80' }) => (
	<div className="flex items-center">
		<div className={`border-r border-gray-200 mx-1 ${className}`}></div>
	</div>
);

export const HSeparator: FC<{ className?: string }> = ({ className = '' }) => (
	<div className={`w-full border-t border-gray-200 ${className}`}></div>
);
