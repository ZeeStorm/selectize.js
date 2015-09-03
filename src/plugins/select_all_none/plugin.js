Selectize.define('select_all_none', function (options) {
	var self = this;

	options = $.extend({
		buttonContainerClass: 'selectize-select-all-none-button-container',
		selectAllButtonClass: 'selectize-select-all-button',
		selectNoneButtonClass: 'selectize-select-none-button',

		html: function (data) {
			return (
				'<div class="' + data.buttonContainerClass + '">' +
					'<button type="button" class="' + data.selectAllButtonClass + '" />' +
					'<button type="button" class="' + data.selectNoneButtonClass + '" />' +
				'</div>'
			);
		}
	}, options);

	this.setup = (function () {
		var original = self.setup;
		return function () {
			original.apply(this, arguments);
			self.$selectAllNoneContainer = $(options.html(options));
			self.$wrapper.prepend(self.$selectAllNoneContainer);
			/*
				TODO: need to find out how to access the visible values in the click handler (SB)
				see refreshOptions method in Selectize constuctor
			*/
			this.$control.on('click', '.' + options.data.selectAllButtonClass, function (e) {
				e.preventDefault();
				console.log('select all fired: ', e);
			});

			this.$control.on('click', '.' + options.data.selectNoneButtonClass, function (e) {
				e.preventDefault();
				console.log('deselect all fired: ', e);
			});
		};
	})();
});
