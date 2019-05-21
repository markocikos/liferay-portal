import {isObject} from 'metal';

/**
 * Returns dimensions and coordinates representing a cropped region
 * @param {!Element} imagePreview Image that will be cropped
 * @param {!Object} region Object representing the coordinates which should be 
 * cropped
 * @return {!Object} Object representing dimensions and coordinates of the 
 * cropped image
 * @review
 */

export default function getCropRegion(imagePreview, region) {
	if (isObject(imagePreview) && imagePreview.tagName === 'IMG' && isObject(region)) {
		let scaleX = imagePreview.naturalWidth / imagePreview.offsetWidth;
		let scaleY = imagePreview.naturalHeight / imagePreview.offsetHeight;

		let regionHeight = region.height ? (region.height * scaleY) : imagePreview.naturalHeight;
		let regionWidth = region.width ? (region.width * scaleX) : imagePreview.naturalWidth;

		let regionX = region.x ? Math.max(region.x * scaleX, 0) : 0;
		let regionY = region.y ? Math.max(region.y * scaleY, 0) : 0;

		return {
			height: regionHeight,
			width: regionWidth,
			x: regionX,
			y: regionY
		};
	}

	return null;
}