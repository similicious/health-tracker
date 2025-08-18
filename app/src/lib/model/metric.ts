import type { BaseCollectionItem } from './base-collection';

export interface Metric extends BaseCollectionItem {
	metric_type: string;
	value: number;
	datetime: string;
	note?: string;
}
