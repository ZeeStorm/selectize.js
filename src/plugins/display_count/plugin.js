Selectize.define("display_count", function (options) {
        var self = this;

        options = $.extend({
            countContainerClass: "selectize-option-count-container",

            html: function (data) {
                return (
                    '<div class="' + data.countContainerClass + '"></div>'
                );
            }
        }, options);

        this.setup = (function () {
            var original = self.setup;
            return function () {
                original.apply(this, arguments);
                self.$countContainer = $(options.html(options));
                self.$dropdown.append(self.$countContainer);
                self.$countContainer.html(Object.keys(self.options).length + " total options available. To see any options not displayed, start typing.");
            };
        })();
    });
