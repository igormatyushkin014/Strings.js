import {
	LocaleReader
} from "./locale-reader";

export class LocalizationRule {

	constructor(
		public languageCode: string,
		public countryCode: string,
		public formatter: LocalizationRuleFormatter
	) {
	}

	isCompatibleWithLocale(
		locale: string
	): boolean {
		let localeReader = new LocaleReader(
			locale
		);

		if (this.languageCode && this.languageCode.toLowerCase() !== localeReader.language.toLowerCase()) {
			return false;
		}

		if (this.countryCode && this.countryCode.toLowerCase() !== localeReader.country.toLowerCase()) {
			return false;
		}

		return true;
	}
}

export type LocalizationRuleFormatter = (data: any) => string;
