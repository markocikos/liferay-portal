/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {ClayCardWithHorizontal} from '@clayui/card';
import React, {useState} from 'react';

export default function HorizontalCard({
	actions = [],
	cssClass,
	disabled,
	href,
	icon,
	inputName,
	inputValue,
	interactive,
	locale: _locale,
	onSelectChange = () => {},
	portletId: _portletId,
	portletNamespace: _portletNamespace,
	selectable,
	selected,
	title,
	...otherProps
}) {
	const [selectedValue, setSelectedValue] = useState(selected);

	const handleSelectChange = (selected) => {
		setSelectedValue(selected);

		onSelectChange(selected);
	};

	return (
		<ClayCardWithHorizontal
			actions={actions}
			checkboxProps={{
				name: inputName,
				value: inputValue,
			}}
			className={cssClass}
			disabled={disabled}
			dropDownTriggerProps={{
				title,
			}}
			href={href}
			interactive={interactive}
			onSelectChange={selectable ? handleSelectChange : null}
			selectable={selectable}
			selected={selectedValue}
			symbol={icon}
			title={title}
			{...otherProps}
		/>
	);
}
