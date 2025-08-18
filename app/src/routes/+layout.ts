export const prerender = false;
export const ssr = false;

import { pb } from '$lib/pocketbase';
import type { MetricType } from '$lib/model/metric-type';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const metricTypes = await pb
		.collection<MetricType>('metric_type')
		.getFullList({ sort: 'name' });

	return {
		metricTypes
	};
};
