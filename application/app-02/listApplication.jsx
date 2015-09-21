var ListTitle = React.createClass({
	render: function () {
		return (
			<h1>{this.props.title}</h1>
		);
	}
});

var ListItem = React.createClass({
	render: function () {
		return (
			<div>
				<span>{this.props.item.text}</span>
				<button>Delete</button>
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
	render: function () {
		return (
			<div>
				<input placeholder="new item text" /><button>Create</button>
			</div>
		);
	}
});

var ListApplication = React.createClass({
	render: function () {
		return (
			<div>
				<ListTitle title={this.props.title}></ListTitle>
				<ListCreateItem />
				<ListItems items={this.props.items}></ListItems>
			</div>
		);
	}
});

React.render(<ListApplication items={data.items} title={data.title}/>, document.getElementById('listApplication'));
