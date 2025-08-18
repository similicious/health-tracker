import type { Metric } from '$lib/model/metric';
import type { MetricType } from '$lib/model/metric-type';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	try {
		const metricType = await locals.pb.collection<MetricType>('metric_type').getOne(params.id);

		const metrics = await locals.pb.collection<Metric>('metric').getList(0, 200, {
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
