export class LocaleReader {

	constructor(
		public locale: string
	) {
	}

	public get language(): string | undefined {
		let components = this.locale.split("-");

		if (components.length) {
			return components[0];
		} else {
			return undefined;
		}
	}

	public get country(): string | undefined {
		let components = this.locale.split("-");

		if (components.length > 1) {
			return components[1];
		} else {
			return undefined;
		}
	}
}
