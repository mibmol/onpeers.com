import { useState } from 'react';
import useSWR from 'swr';
import { encryptPassword } from '../utils/encryption';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Doit() {
	const { data, error } = useSWR('https://restcountries.eu/rest/v2/region/europe', fetcher);
	const [count, setCount] = useState(0);

	function doit() {
		setCount(count + 1);
	}


	if (error) {
		return <div>Error, {error}</div>;
	}
	if (!data) {
		return <div>loading...</div>;
	}

	return (
		<div className="flex-col">
			<button onClick={doit}>change {count}</button>
			{data.map(({ name }) => (
				<div className="px-4 py-2" key={name}>
					{name}
				</div>
			))}
		</div>
	);
}
