import { pb } from '$lib/pocketbase';
import type { MetricType } from '$lib/model/metric-type';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const metricTypes = await pb.collection<MetricType>('metric_type').getFullList();
	return { metricTypes };
};
