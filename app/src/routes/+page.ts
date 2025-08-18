import { pb } from '$lib/pocketbase';
import type { Metric } from '$lib/model/metric';
import type { MetricType } from '$lib/model/metric-type';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const metrics = await pb
		.collection<Metric>('metric')
		.getList(0, 50, { sort: '+datetime' });
	const metricTypes = await pb.collection<MetricType>('metric_type').getFullList();

	const metricTypesById = metricTypes.reduce(
		(acc, metric) => {
			acc[metric.id] = metric;
			return acc;
		},
		{} as Record<string, MetricType>
	);

	return { metrics, metricTypesById };
};
