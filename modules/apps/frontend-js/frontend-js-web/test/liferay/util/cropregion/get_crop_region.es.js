'use strict';

import dom from 'metal-dom';
import getCropRegion from '../../../../src/main/resources/META-INF/resources/liferay/util/cropregion/get_crop_region.es';

describe(
	'Liferay.Util.getCropRegion',
	() => {
		it(
			'should return an object if region receives every argument except height',
			() => {
				const image = {
					naturalHeight: 438,
					naturalWidth: 558,
					offsetHeight: 438,
					offsetWidth: 558,
					tagName: 'IMG'
				};

				const region = {
					width: 558,
					x: 0,
					y: 0
				};

				expect(getCropRegion(image, region)).toEqual(
					{
						height: 438,
						width: 558,
						x: 0,
						y: 0
					}
				);
			}
		);

		it(
			'should return null if image parameter is not an image element',
			() => {
				const image = dom.buildFragment('<div />');

				const region = {
					height: 100,
					width: 100,
					x: 0,
					y: 0
				};

				expect(getCropRegion(image, region)).toEqual(null);
			}
		);

		it(
			'should return null if region parameter is not an object',
			() => {
				const image = new Image();

				const region = 'foo';

				expect(getCropRegion(image, region)).toEqual(null);
			}
		);

		it(
			'should return an object if imagePreview parameter is an image and region parameter is an object',
			() => {
				const image = {
					naturalHeight: 438,
					naturalWidth: 558,
					offsetHeight: 438,
					offsetWidth: 558,
					tagName: 'IMG'
				};

				const region = {
					height: 438,
					width: 558,
					x: 0,
					y: 0
				};

				expect(getCropRegion(image, region)).toEqual(
					{
						height: 438,
						width: 558,
						x: 0,
						y: 0
					}
				);
			}
		);
	}
);