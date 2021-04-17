import { Service } from '../models/service';

export const SERVICES: Service[] = [
	{
		id: 0,
		peerId: 0,
		name: 'service 00',
		description: 'given peer description',
		maxDuration: 45,
	},
	{
		id: 1,
		peerId: 0,
		name: 'service 11 recurrent',
		description: 'given peer description',
		maxDuration: 30,
	},
];
