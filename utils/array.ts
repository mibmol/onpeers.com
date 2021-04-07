/**
 * Create chunks of the given array or string with equal chunkSize
 * ex: createChunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3)
 * 	returns [[1,2,3], [4,5,6], [7,8,9], [10,11]]
 *
 * 	createChunks('abcdefghijk', 3)
 * 	returns ['abc', 'def', 'ghi', 'jk']
 */
export function createChunks(array: any[] | string, chunkSize: number): any[] {
	let chunks = [];
	let n = array.length;
	let i = 0;

	while (i < n) {
		chunks.push(array.slice(i, (i += chunkSize)));
	}
	return chunks;
}

export function arrayFill<T>(length: number, defaultValue: T = null): T[] {
	return new Array<T>(length).fill(defaultValue, 0);
}

export function remove<T>(array: T[], predicate: (e: T) => boolean): T[] {
	let removed: T[] = [];
	let indexes = [];
	let index = -1;
	let { length } = array;

	while (++index < length) {
		let value = array[index];
		if (predicate(value)) {
			removed.push(value);
			indexes.push(index);
		}
	}

	for (let i of indexes) {
		array.splice(i, 1);
	}

	return removed;
}
