create table FVSEntry (
	mvccVersion LONG default 0 not null,
	uuid_ VARCHAR(75) null,
	fvsEntryId LONG not null primary key,
	companyId LONG,
	userId LONG,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	viewState TEXT null
);

create table FVSFrontendDataSet (
	mvccVersion LONG default 0 not null,
	uuid_ VARCHAR(75) null,
	fvsFrontendDataSetId LONG not null primary key,
	companyId LONG,
	userId LONG,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	fvsEntryId LONG,
	fdsName VARCHAR(75) null,
	name VARCHAR(75) null,
	plid LONG,
	portletId VARCHAR(75) null
);