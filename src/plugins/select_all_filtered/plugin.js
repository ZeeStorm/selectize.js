Selectize.define('select_all_filtered', function (options) {
	var self = this;

	options = $.extend({
		buttonContainerClass: 'selectize-select-all-button-container',
		selectAllButtonClass: 'selectize-select-all-button',

		html: function (data) {
			return (
				'<div class="' + data.buttonContainerClass + '">' +
					'<button type="button" class="btn btn-default ' + data.selectAllButtonClass + '">Select All</button>' +
				'</div>'
			);
		}
	}, options);

	this.setup = (function () {
		var original = self.setup;
		return function () {
			original.apply(this, arguments);
			self.$selectAllContainer = $(options.html(options));
			self.$dropdown.prepend(self.$selectAllContainer);

			self.$selectAllContainer.on('click', '.' + options.selectAllButtonClass, function (e) {
				e.preventDefault();
				self.addItems(self.visibleOptionModel.items.map(function (value) {
					return value.id;
				}));
			});
		};
	})();

	this.onBlur = (function () {
		var original = self.onBlur;
		return function (e, dest) {
			if (!dest || dest === $('.' + options.selectAllButtonClass)[0]) {
				if (e) {
					e.preventDefault();
				}
				return;
			}
			return original.apply(this, arguments);
		};
	})();
});
