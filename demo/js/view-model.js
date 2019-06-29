function createViewModel(rootElementSelector) {
	return new Vue({
		el: rootElementSelector,
		data: {
			logo: {
				text: "Logo"
			},
			strings: strings,
			currentLocale: "en-US"
		},
		methods: {
		}
	});
}
