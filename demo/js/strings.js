const strings = {
	/*
		Title.
	*/
	title: new LocalizableString()
		.setDefaultLocale("en-US")
		.language(
			"en",
			"Great library!"
		)
		.language(
			"fr",
			"La bibliothèque incroyable!"
		)
		.language(
			"ru",
			"Отличная библиотека!"
		),

	/*
		Description.
	*/
	description: new LocalizableString()
		.setDefaultLocale("en-US")
		.languageWithData(
			"en",
			(data) => {
				let timesCount = English.isPluralForm(data.count)
					? `${data.count} times`
					: `${data.count} time`;
				return `${timesCount} better than the other existing solutions.`;
			}
		)
		.languageWithData(
			"fr",
			(data) => {
				return `${data.count} fois mieux que les autres solutions existantes.`;
			}
		)
		.languageWithData(
			"ru",
			(data) => {
				let количествоРаз = Russian.isPluralForm(data.count)
					? `${data.count} раз`
					: `${data.count} раза`;
				return `В ${количествоРаз} лучше, чем другие существующие решения.`;
			}
		)
}

class English {

	static isPluralForm(count) {
		return count != 1;
	}
}

class Russian {

	static isPluralForm(count) {
		let d10 = count % 10;
		let d100 = count % 100;

		if (12 <= d100 && d100 <= 14) {
			return true;
		} else if (2 <= d10 && d10 <= 4) {
			return false;
		} else {
			return true;
		}
	}
}

console.log(
	strings.title.getText(null),
	strings.description.getText({
		count: 712638712634
	})
);
