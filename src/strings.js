class LocaleReader {

	static forCurrentLocale() {
		var locale;

		if (navigator.languages && navigator.languages.length) {
			locale = navigator.languages[0];
		} else {
			locale = navigator.userLanguage
				|| navigator.language
				|| navigator.browserLanguage;
		}

		return new LocaleReader(
			locale
		);
	}

	constructor(locale) {
		this.locale = locale;
	}

	get language() {
		let components = this.locale.split("-");

		if (components.length) {
			return components[0];
		} else {
			return undefined;
		}
	}

	get country() {
		let components = this.locale.split("-");

		if (components.length > 1) {
			return components[1];
		} else {
			return undefined;
		}
	}
}

class LocalizationRule {

	/**
		@param {(data: any) => String} formatter Text formatter.
	 */
	constructor(
		languageCode,
		countryCode,
		formatter
	) {
		this.languageCode = languageCode;
		this.countryCode = countryCode;
		this.formatter = formatter;
	}

	isCompatibleWithLocale(locale) {
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

class LocalizableString {

	constructor() {
		this.rules = [];
		this.defaultLocale = undefined;
	}

	/**
		Creates new rule based on locale.
		@param {String} code Locale code.
		@param {String} value Static text.
		@return {String} Current instance.
	 */
	locale(
		code,
		value
	) {
		let localeReader = new LocaleReader(code);
		let rule = new LocalizationRule(
			localeReader.language,
			localeReader.country,
			(data) => {
				return value;
			}
		);
		this.rules.push(
			rule
		);
		return this;
	}

	/**
		Creates new rule based on a locale.
		@param {String} code Locale code.
		@param {(data: any) => String} formatter Dynamic text formatter.
		@return {String} Current instance.
	 */
	localeWithData(
		code,
		formatter
	) {
		let localeReader = new LocaleReader(code);
		let rule = new LocalizationRule(
			localeReader.language,
			localeReader.country,
			(data) => {
				return formatter(
					data
				);
			}
		);
		this.rules.push(
			rule
		);
		return this;
	}

	/**
		Creates new rule based on a language.
		@param {String} code Language code.
		@param {String} value Static text.
		@return {String} Current instance.
	 */
	language(
		code,
		value
	) {
		let rule = new LocalizationRule(
			code,
			null,
			(data) => {
				return value;
			}
		);
		this.rules.push(
			rule
		);
		return this;
	}

	/**
		Creates new rule based on a language.
		@param {String} code Language code.
		@param {(data: any) => String} formatter Dynamic text formatter.
		@return {String} Current instance.
	 */
	languageWithData(
		code,
		formatter
	) {
		let rule = new LocalizationRule(
			code,
			null,
			(data) => {
				return formatter(
					data
				);
			}
		);
		this.rules.push(
			rule
		);
		return this;
	}

	/**
		Creates new rule based on a country.
		@param {String} code Country code.
		@param {String} value Static text.
		@return {String} Current instance.
	 */
	country(
		code,
		value
	) {
		let rule = new LocalizationRule(
			null,
			code,
			(data) => {
				return value;
			}
		);
		this.rules.push(
			rule
		);
		return this;
	}

	/**
		Creates new rule based on a country.
		@param {String} code Country code.
		@param {(data: any) => String} formatter Dynamic text formatter.
		@return {String} Current instance.
	 */
	countryWithData(
		code,
		formatter
	) {
		let rule = new LocalizationRule(
			null,
			code,
			(data) => {
				return formatter(
					data
				);
			}
		);
		this.rules.push(
			rule
		);
		return this;
	}

	/**
		Sets default locale that will be used
		when no rule was found
		for the current locale.
		@param {String} locale Default locale.
		@return {String} Current instance.
	 */
	setDefaultLocale(locale) {
		this.defaultLocale = locale;
		return this;
	}

	/**
		Text value based on current locale.
		@param {String} data Data.
		@param {String} locale Locale.
		 	This parameter is optional.
		 	Use it when you need to force some locale
		 	instead of the current or default one.
		@return {String} Text value based on current locale.
	 */
	getText(
		data,
		locale
	) {
		let getRuleForLocale = (locale) => {
			return this.rules.find((rule) => {
				return rule.isCompatibleWithLocale(
					locale
				);
			});
		};

		let findAppropriateRule = () => {
			if (locale) {
				return getRuleForLocale(locale);
			}

			var rule = getRuleForLocale(LocaleReader.forCurrentLocale().locale);

			if (!rule && this.defaultLocale) {
				rule = getRuleForLocale(this.defaultLocale);
			}

			return rule;
		};

		let rule = findAppropriateRule();

		if (rule) {
			return rule.formatter(
				data
			);
		} else {
			return "";
		}
	}
}
