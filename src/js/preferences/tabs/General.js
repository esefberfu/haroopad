define([
		'tabs/General.opt'
	], function(options) {

		var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.general.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		var GeneralTabView = Backbone.View.extend({
			el: '#general-tab',

			events: {
				'click input[name=enableAutoComplete]': 'enableAutoComplete',	
				'click input[name=enableMath]': 'enableMath',	
				'click input[name=enableSyncScroll]': 'enableSyncScroll',	
				'click input[name=enableLastFileRestore]': 'enableLastFileRestore',
				'click input[name=playKeypressSound]': 'playKeypressSound'
			},

			initialize: function() {
				this.$el.find('input[name=enableAutoComplete]').prop('checked', config.enableAutoComplete);
				this.$el.find('input[name=enableMath]').prop('checked', config.enableMath);
				this.$el.find('input[name=enableSyncScroll]').prop('checked', config.enableSyncScroll);
				this.$el.find('input[name=enableLastFileRestore]').prop('checked', config.enableLastFileRestore);
				this.$el.find('input[name=playKeypressSound]').prop('checked', config.playKeypressSound);
			},

			enableAutoComplete: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableAutoComplete', bool);
			},

			enableMath: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableMath', bool);
			},

			enableSyncScroll: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableSyncScroll', bool);
			},

			enableLastFileRestore: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableLastFileRestore', bool);
			},

			playKeypressSound: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('playKeypressSound', bool);
			}
		});

		return new GeneralTabView;

});