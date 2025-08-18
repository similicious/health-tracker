import type { BaseCollectionItem } from './base-collection';

export interface MetricType extends BaseCollectionItem {
	name: string;
	color: number;
	description: string;
	unit: string;
}
