function createViewModel(rootElementSelector) {
	return new Vue({
		el: rootElementSelector,
		data: {
			logo: {
				text: "Strings.js"
			},
			strings: strings,
			currentLocale: "en-US"
		},
		methods: {
		}
	});
}
