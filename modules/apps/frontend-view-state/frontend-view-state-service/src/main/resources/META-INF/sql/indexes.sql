create index IX_2943B369 on FVSEntry (uuid_[$COLUMN_LENGTH:75$], companyId);

create index IX_F02479F9 on FVSFrontendDataSetEntry (userId, fdsName[$COLUMN_LENGTH:200$], plid, portletId[$COLUMN_LENGTH:200$]);
create index IX_74A0B309 on FVSFrontendDataSetEntry (uuid_[$COLUMN_LENGTH:75$], companyId);