export interface MTCAuthUser {
	id: string;
	byuId?: string;
	byuPersonId?: string;
	byuNetId?: string;
	ldsCommonName?: string;
	name?: string;
	givenName?: string;
	surName?: string;
	mrn?: string;
	workforceId?: string;
	gender?: string;
	birthDate?: string;
	currentChurchUnit?: string;
	preferredLanguage?: string;
	country?: string;
	locale?: string;
	emailAddress?: string;
	preferredFirstName?: string;
	roles?: string[];
	legacyMissionaryId?: string;
	missionaryId?: string;
	cmisId?: string;
	missionaryTypeDescription?: string;
	environment?: string;
}
