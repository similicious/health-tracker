import type { Metric } from '$lib/model/metric';
import type { MetricType } from '$lib/model/metric-type';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const metrics = await locals.pb
		.collection<Metric>('metric')
		.getList(0, 50, { sort: '+datetime' });
	const metricTypes = await locals.pb.collection<MetricType>('metric_type').getFullList();

	const metricTypesById = metricTypes.reduce(
		(acc, metric) => {
			acc[metric.id] = metric;
			return acc;
		},
		{} as Record<string, MetricType>
	);

	return { metrics, metricTypesById };
};
