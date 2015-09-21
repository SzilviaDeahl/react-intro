var ListTitle = React.createClass({
	render: function () {
		return (
			<h1>{this.props.title}</h1>
		);
	}
});

var ListItem = React.createClass({
	handleDelete: function () {
		actions.deleteItem(this.props.item.id);
	},
	render: function () {
		return (
			<div>
				<span>{this.props.item.text}</span>
				<button onClick={this.handleDelete}>Delete</button>
			</div>
		)
	}
});

var ListItems = React.createClass({
	render: function () {
		var items = this.props.items.map(function (item) {
			return <li><ListItem item={item} /></li>;
		});
		return (
			<ul>
				{items}
			</ul>
		);
	}
});

var ListCreateItem = React.createClass({
	handleCreate: function () {
		var text = React.findDOMNode(this.refs.text);
		actions.createItem(text.value.trim());
		text.value = '';
	},
	render: function () {
		return (
			<div>
				<input placeholder="new item text" ref="text" />
				<button onClick={this.handleCreate}>Create</button>
			</div>
		);
	}
});

var ListApplication = React.createClass({
	getInitialState: function() {
		return actions.getData();
	},
	_onChange: function () {
		this.setState(actions.getData());
	},
	componentDidMount: function () {
		emitter.addListener('change', this._onChange);
	},
	componentWillUnmount: function() {
		emitter.removeListener('change', this._onChange);
	},
	render: function () {
		return (
			<div>
				<ListTitle title={this.state.title}></ListTitle>
				<ListCreateItem />
				<ListItems items={this.state.items}></ListItems>
			</div>
		);
	}
});

React.render(<ListApplication />, document.getElementById('listApplication'));
