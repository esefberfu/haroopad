define([
		'tabs/Viewer.opt'
	], function(options) {
		var readdir = require('readdir');
		var path = require('path');

		var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.viewer.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		function loadCodeCSSFiles() {
			var csses = readdir.readSync(global.PATHS.css_code, [ '*.css' ], readdir.ABSOLUTE_PATHS + readdir.CASELESS_SORT);
			var name, themes = {};

			csses.forEach(function(css, idx) {
				name = path.basename(css).replace('.css','');
				themes[name] = {
					id: idx,
					name: name,
					path: css
				}
			});

			return themes;
		}

		var ViewerTabView = Backbone.View.extend({
			el: '#viewer-tab',

			events: {
				'change select[name=viewStyle]': 'changeViewStyle',
				'change select[name=fontSize]': 'changeFontSize',
				'change select[name=fontFamily]': 'changeFontFamily',
				'click input[name=clickableLink]': 'clickableLink'	
			},

			initialize: function() {
				this.$el.find('select[name=viewStyle]').select2().select2("val", config.theme);
				this.$el.find('select[name=fontSize]').select2().select2("val", config.fontSize);
				this.$el.find('select[name=fontFamily]').select2().select2("val", config.fontFamily);
				
				this.$el.find('input[name=clickableLink]').prop('checked', config.clickableLink);
			},

			changeViewStyle: function(e) {
				options.set({ theme: e.val });
			},

			changeFontSize: function(e) {
				options.set({ fontSize: Number(e.val) });
			},

			changeFontFamily: function(e) {
				var font = e.val.split(' ').join('+');
				options.set({ fontFamily: e.val });
			},

			clickableLink: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('clickableLink', bool);
			}
		});

		return new ViewerTabView;

});