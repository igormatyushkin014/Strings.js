import {
	LocalizationRule,
	LocalizationRuleFormatter
} from "./localization-rule";

import {
	LocaleReader
} from "./locale-reader";

export class LocalizableString {

	private rules = new Array<LocalizationRule>();

	private defaultLocale: string | undefined = undefined;

	constructor() {
	}

	/**
		Creates new rule based on locale.
		@param {String} code Locale code.
		@param {String} value Static text.
		@return {String} Current instance.
	 */
	locale(
		code: string,
		value: string
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
		@param {LocalizationRuleFormatter} formatter Dynamic text formatter.
		@return {String} Current instance.
	 */
	localeWithData(
		code: string,
		formatter: LocalizationRuleFormatter
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
		@param {LocalizationRuleFormatter} formatter Dynamic text formatter.
		@return {String} Current instance.
	 */
	languageWithData(
		code: string,
		formatter: LocalizationRuleFormatter
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
		code: string,
		value: string
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
		@param {LocalizationRuleFormatter} formatter Dynamic text formatter.
		@return {String} Current instance.
	 */
	countryWithData(
		code: string,
		formatter: LocalizationRuleFormatter
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
	setDefaultLocale(
		locale: string
	) {
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
		data: any,
		locale: string
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

			var rule: LocalizationRule;

			if (this.defaultLocale) {
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
