create index IX_2943B369 on FVSEntry (uuid_[$COLUMN_LENGTH:75$], companyId);

create index IX_89C76D8D on FVSFrontendDataSet (userId, fdsName[$COLUMN_LENGTH:75$], plid, portletId[$COLUMN_LENGTH:75$]);
create index IX_1AA54E9D on FVSFrontendDataSet (uuid_[$COLUMN_LENGTH:75$], companyId);