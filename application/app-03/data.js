var data = {
	title: "My Favorite Colors",
	items: [
		{
			id: Math.random(),
			text: "Red"
		},
		{
			id: Math.random(),
			text: "Blue"
		}
	]
}

var emitter = new EventEmitter();

var actions = {
	getData: function () {
		return data;
	},
	createItem: function (text) {
		data.items.push({
			id: Math.random(),
			text: text
		});
		emitter.emitEvent('change');
	},
	deleteItem: function (id) {
		data.items = data.items.filter(function (item) {
			if (item.id === id) {
				return false;
			}
			return true;
		});
		emitter.emitEvent('change');
	}
}
