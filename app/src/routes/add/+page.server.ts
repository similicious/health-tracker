import { redirect } from '@sveltejs/kit';
import type { Metric } from '$lib/model/metric';
import type { MetricType } from '$lib/model/metric-type';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const metricTypes = await locals.pb.collection<MetricType>('metric_type').getFullList();
	return { metricTypes };
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const metricTypeId = formData.get('metricTypeId')?.toString();
		const value = formData.get('value')?.toString();
		const datetime = formData.get('datetime')?.toString();
		const note = formData.get('note')?.toString();

		if (!value || !datetime || !metricTypeId) {
			return;
		}

		await event.locals.pb.collection('metric').create<Metric>({
			metric_type: metricTypeId,
			value: parseFloat(value),
			note: note,
			datetime: new Date(datetime)
		});

		throw redirect(303, '/');
	}
} satisfies Actions;
