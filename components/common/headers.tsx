import { FC } from 'react';

export const Assets = () => (
	<>
		<link rel="icon" href="/favicon.ico" />
		{/* <link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap"
			rel="stylesheet"
		/> */}
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
			rel="stylesheet"
		/>
	</>
);

export const DateLocale: FC<{ alpha2code: string }> = ({ alpha2code }) => (
	<script src={`https://unpkg.com/dayjs@1.10.4/locale/it.js`}></script>
);
