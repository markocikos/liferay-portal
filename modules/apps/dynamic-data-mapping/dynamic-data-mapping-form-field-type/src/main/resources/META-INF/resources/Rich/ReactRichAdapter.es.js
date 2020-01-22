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

import CKEditor from 'ckeditor4-react';
import {ClayInput} from '@clayui/form';
import React, {useEffect, useState} from 'react';

import getConnectedReactComponentAdapter from '../util/ReactComponentAdapter.es';
import templates from './RichAdapter.soy.js';

const CKEDITOR_CONFIG = {
	toolbarGroups: [
		{name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
		{
			name: 'paragraph',
			groups: ['list', 'indent']
		},
		{name: 'links', groups: ['links']}
	],
	removeButtons:
		'About,Anchor,BGColor,BidiLtr,BidiRtl,Button,Checkbox,CopyFormatting,Find,Flash,Font,FontSize,Form,Format,HiddenField,HorizontalRule,Iframe,Image,ImageButton,JustifyBlock,JustifyCenter,JustifyLeft,JustifyRight,Language,Maximize,NewPage,PageBreak,PasteFromWord,PasteText,Preview,Print,Radio,RemoveFormat,Replace,Save,Select,SelectAll,ShowBlocks,Smiley,SpecialChar,Styles,Subscript,Superscript,Table,Templates,TextColor,TextField,Textarea'
};

const Rich = ({dispatch, inputValue, name, readOnly}) => {
	const [value, setValue] = useState(inputValue);

	useEffect(() => {
		if (inputValue !== value) {
			setValue(inputValue);
		}
	}, [inputValue]);

	const _handleEditorChange = event => {
		setValue(event.editor.getData());
	};

	const _handleEditorBlur = () => {
		dispatch({
			payload: value,
			type: 'value'
		});
	};

	return (
		<>
			{!readOnly && (
				<>
					<CKEditor
						config={CKEDITOR_CONFIG}
						data={value}
						onBeforeLoad={CKEDITOR =>
							(CKEDITOR.disableAutoInline = true)
						}
						onBlur={_handleEditorBlur}
						onChange={_handleEditorChange}
						readOnly={readOnly}
					/>
				</>
			)}

			{readOnly && <div dangerouslySetInnerHTML={{__html: value}} />}
		</>
	);
};

const ReactRichAdapter = getConnectedReactComponentAdapter(Rich, templates);

export {ReactRichAdapter};
export default ReactRichAdapter;
