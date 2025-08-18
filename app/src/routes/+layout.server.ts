import type { MetricType } from '$lib/model/metric-type';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const metricTypes = await locals.pb
		.collection<MetricType>('metric_type')
		.getFullList({ sort: 'name' });

	return {
		metricTypes
	};
};
