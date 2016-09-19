Selectize.define('clear_all_filtered', function (options) {
	var self = this;

	options = $.extend({
		buttonContainerClass: 'selectize-clear-all-button-container',
		clearAllButtonClass: 'selectize-clear-all-button',

		html: function (data) {
			return (
				'<div class="' + data.buttonContainerClass + '">' +
					'<button type="button" class="btn btn-default ' + data.clearAllButtonClass + '">Clear All</button>' +
				'</div>'
			);
		}
	}, options);

	this.setup = (function () {
		var original = self.setup;
		return function () {
			original.apply(this, arguments);
			self.$clearAllContainer = $(options.html(options));
			self.$dropdown.prepend(self.$clearAllContainer);

			self.$clearAllContainer.on('click', '.' + options.clearAllButtonClass, function (e) {
				e.preventDefault();
				self.clear();
				self.setTextboxValue('');
				self.open();
			});
		};
	})();

	this.onBlur = (function () {
		var original = self.onBlur;
		return function (e, dest) {
			if (!dest || $(dest).is('.' + options.clearAllButtonClass)) {
				if (e) {
					e.preventDefault();
				}
				return;
			}
			return original.apply(this, arguments);
		};
	})();
});
