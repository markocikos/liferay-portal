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

package com.liferay.frontend.taglib.clay.servlet.taglib;

import com.liferay.frontend.taglib.clay.internal.servlet.taglib.BaseContainerTag;
import com.liferay.frontend.taglib.clay.servlet.taglib.soy.HorizontalCard;
import com.liferay.frontend.taglib.clay.servlet.taglib.util.DropdownItem;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.util.ListUtil;
import com.liferay.taglib.util.TagResourceBundleUtil;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

/**
 * @author Marko Cikos
 */
public class HorizontalCardTag extends BaseContainerTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		Map<String, String> data = getData();

		if (data != null) {
			for (Map.Entry<String, String> entry : data.entrySet()) {
				setDynamicAttribute(
					StringPool.BLANK, "data-" + entry.getKey(),
					entry.getValue());
			}
		}

		return super.doStartTag();
	}

	public List<DropdownItem> getActionDropdownItems() {
		if ((_actionDropdownItems != null) && (_horizontalCard != null)) {
			return _horizontalCard.getActionDropdownItems();
		}

		return _actionDropdownItems;
	}

	@Override
	public String getCssClass() {
		if ((super.getCssClass() == null) && (_horizontalCard != null)) {
			if (_horizontalCard.getCssClass() != null) {
				return _horizontalCard.getCssClass();
			}

			if (_horizontalCard.getElementClasses() != null) {
				return _horizontalCard.getElementClasses();
			}
		}

		return super.getCssClass();
	}

	public Map<String, String> getData() {
		if ((_data == null) && (_horizontalCard != null)) {
			return _horizontalCard.getData();
		}

		return _data;
	}

	public String getHref() {
		if ((_href == null) && (_horizontalCard != null)) {
			return _horizontalCard.getHref();
		}

		return _href;
	}

	public String getIcon() {
		if (_icon == null) {
			if (_horizontalCard == null) {
				return "folder";
			}

			return _horizontalCard.getIcon();
		}

		return _icon;
	}

	@Override
	public String getId() {
		if ((super.getId() == null) && (_horizontalCard != null)) {
			return _horizontalCard.getId();
		}

		return super.getId();
	}

	public Boolean getInteractive() {
		if ((_interactive == null) && (_horizontalCard != null)) {
			return _horizontalCard.isInteractive();
		}

		return _interactive;
	}

	public String getTitle() {
		if ((_title == null) && (_horizontalCard != null)) {
			return _horizontalCard.getTitle();
		}

		return _title;
	}

	public Boolean isDisabled() {
		if (_disabled == null) {
			if (_horizontalCard == null) {
				return false;
			}

			return _horizontalCard.isDisabled();
		}

		return _disabled;
	}

	public Boolean isSelectable() {
		if (_selectable == null) {
			if (_horizontalCard == null) {
				return false;
			}

			return _horizontalCard.isSelectable();
		}

		return _selectable;
	}

	public Boolean isSelected() {
		if (_selected == null) {
			if (_horizontalCard == null) {
				return false;
			}

			return _horizontalCard.isSelected();
		}

		return _selected;
	}

	public void setActionDropdownItems(List<DropdownItem> actionDropdownItems) {
		_actionDropdownItems = actionDropdownItems;
	}

	public void setData(Map<String, String> data) {
		_data = data;
	}

	public void setDisabled(Boolean disabled) {
		_disabled = disabled;
	}

	public void setHorizontalCard(HorizontalCard horizontalCard) {
		_horizontalCard = horizontalCard;
	}

	public void setHref(String href) {
		_href = href;
	}

	public void setIcon(String icon) {
		_icon = icon;
	}

	public void setInteractive(Boolean interactive) {
		_interactive = interactive;
	}

	public void setSelectable(Boolean selectable) {
		_selectable = selectable;
	}

	public void setSelected(Boolean selected) {
		_selected = selected;
	}

	public void setTitle(String title) {
		_title = title;
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_actionDropdownItems = null;
		_data = null;
		_disabled = null;
		_horizontalCard = null;
		_href = null;
		_icon = null;
		_interactive = null;
		_selectable = null;
		_selected = null;
		_title = null;
	}

	@Override
	protected String getHydratedModuleName() {
		return "frontend-taglib-clay/HorizontalCard";
	}

	@Override
	protected Map<String, Object> prepareProps(
		Map<String, Object> initialProps) {

		Map<String, Object> props = super.prepareProps(initialProps);

		props.put("actions", getActionDropdownItems());
		props.put("cssClass", processCssClasses(new LinkedHashSet<>()));
		props.put("disabled", isDisabled());
		props.put("href", getHref());
		props.put("icon", getIcon());
		props.put("id", getId());
		props.put("interactive", getInteractive());
		props.put("selectable", isSelectable());
		props.put("selected", isSelected());
		props.put("title", getTitle());

		return props;
	}

	@Override
	protected String processCssClasses(Set<String> cssClasses) {
		if (isSelectable()) {
			cssClasses.add("form-check");
			cssClasses.add("form-check-card");
			cssClasses.add("form-check-middle-left");
		}
		else {
			cssClasses.add("card");
			cssClasses.add("card-horizontal");
		}

		cssClasses.add("card-type-directory");

		return super.processCssClasses(cssClasses);
	}

	@Override
	protected int processStartTag() throws Exception {
		super.processStartTag();

		Boolean selectable = isSelectable();

		if ((getIcon() == null) && (getTitle() == null) && !selectable) {
			return EVAL_BODY_INCLUDE;
		}

		JspWriter jspWriter = pageContext.getOut();

		if (selectable) {
			jspWriter.write("<div class=\"custom-control custom-checkbox\">");
			jspWriter.write("<label><input");

			if (isSelected()) {
				jspWriter.write(" checked");
			}

			jspWriter.write(" class=\"custom-control-input\" type=\"");
			jspWriter.write("checkbox\" /><span class=\"custom-control-label");
			jspWriter.write("\" /><div class=\"card card-horizontal\">");

			_writeDescription(jspWriter);

			jspWriter.write("</div></label></div>");
		}
		else {
			_writeDescription(jspWriter);
		}

		return SKIP_BODY;
	}

	private void _writeDescription(JspWriter jspWriter) throws Exception {
		jspWriter.write("<span class=\"card-body\"><span class=\"card-row\">");

		String icon = getIcon();

		if (icon != null) {
			jspWriter.write("<div class=\"autofit-col\">");

			StickerTag checkboxTag = new StickerTag();

			checkboxTag.setIcon(icon);
			checkboxTag.setInline(true);

			checkboxTag.doTag(pageContext);

			jspWriter.write("</div>");
		}

		String title = getTitle();

		if (title != null) {
			jspWriter.write("<div class=\"autofit-col autofit-col-expand");
			jspWriter.write(" autofit-col-gutters\"><p class=\"card-title\"");
			jspWriter.write(" title=\"");

			String localizedTitle = LanguageUtil.get(
				TagResourceBundleUtil.getResourceBundle(pageContext), title);

			jspWriter.write(localizedTitle);

			jspWriter.write("\">");
			jspWriter.write("<span class=\"text-truncate-inline\">");

			String href = getHref();

			if ((href != null) && !isDisabled()) {
				LinkTag linkTag = new LinkTag();

				linkTag.setCssClass("text-truncate");
				linkTag.setHref(href);
				linkTag.setLabel(localizedTitle);

				linkTag.doTag(pageContext);
			}
			else {
				jspWriter.write("<span class=\"text-truncate\">");
				jspWriter.write(localizedTitle);
				jspWriter.write("</span>");
			}

			jspWriter.write("</span></div>");
		}

		if (!ListUtil.isEmpty(getActionDropdownItems())) {
			jspWriter.write("<div class=\"autofit-col\"><div class=\"");
			jspWriter.write("dropdown\"><div class=\"dropdown-toggle");
			jspWriter.write(" component-action\">");

			IconTag iconTag = new IconTag();

			iconTag.setSymbol("ellipsis-v");

			iconTag.doTag(pageContext);

			jspWriter.write("</div></div></div>");
		}

		jspWriter.write("</span></span>");
	}

	private static final String _ATTRIBUTE_NAMESPACE = "clay:horizontal-card:";

	private List<DropdownItem> _actionDropdownItems;
	private Map<String, String> _data;
	private Boolean _disabled;
	private HorizontalCard _horizontalCard;
	private String _href;
	private String _icon;
	private Boolean _interactive;
	private Boolean _selectable;
	private Boolean _selected;
	private String _title;

}