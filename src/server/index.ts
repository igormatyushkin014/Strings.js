import {
	LocalizationRule,
	LocalizationRuleFormatter
} from "./localization-rule";

import {
	LocaleReader
} from "./locale-reader";

import {
	LocalizableString
} from "./localizable-string";

export class Localization {
}

module.exports = {
	LocalizationRule: require("./localization-rule"),
	LocaleReader: LocaleReader,
	LocalizableString: LocalizableString
};
