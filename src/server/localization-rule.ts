import {
	LocaleReader
} from "./locale-reader";

export class LocalizationRule {

	constructor(
		public languageCode: string | undefined,
		public countryCode: string | undefined,
		public formatter: LocalizationRuleFormatter
	) {
	}

	isCompatibleWithLocale(
		locale: string
	): boolean {
		let localeReader = new LocaleReader(
			locale
		);

		if (this.languageCode
			&& localeReader.language
			&& this.languageCode.toLowerCase() !== localeReader.language.toLowerCase()
		) {
			return false;
		}

		if (this.countryCode
			&& localeReader.country
			&& this.countryCode.toLowerCase() !== localeReader.country.toLowerCase()
		) {
			return false;
		}

		return true;
	}
}

export type LocalizationRuleFormatter = (data: any) => string;
