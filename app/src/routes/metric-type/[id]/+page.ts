import { pb } from '$lib/pocketbase';
import type { Metric } from '$lib/model/metric';
import type { MetricType } from '$lib/model/metric-type';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const metricType = await pb.collection<MetricType>('metric_type').getOne(params.id);

		const metrics = await pb.collection<Metric>('metric').getList(0, 200, {
			filter: `metric_type="${params.id}"`,
			sort: '-datetime'
		});

		return {
			metricType,
			metrics: metrics.items
		};
	} catch (err) {
		throw error(404, 'Metric type not found');
	}
};
