export class LocaleReader {

	constructor(
		public locale: string
	) {
	}

	public get language(): string {
		let components = this.locale.split("-");

		if (components.length) {
			return components[0];
		} else {
			return undefined;
		}
	}

	public get country() {
		let components = this.locale.split("-");

		if (components.length > 1) {
			return components[1];
		} else {
			return undefined;
		}
	}
}
