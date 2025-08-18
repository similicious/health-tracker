export function getColorHex(colorNum: number) {
	return `#${colorNum.toString(16).padStart(6, '0')}`;
}
