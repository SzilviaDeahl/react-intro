# Writing a React Application

**Step 2/2**

**This is the second step of the series.**
**To view other steps, please check out another branch.**

This step will guide you in writing a React Application.

<img src="http://facebook.github.io/react/img/logo.svg" width="200"/>

## Objectives

* Create a list application with React.
* Plan out an application using React's planning guidelines.
* Write JSX code.
* Write React components.
* Next React components within eachother.
* Pass properties from a parent component to a child component.
* Fire an event on a React component.

## Resources

* [Thinking with React](https://facebook.github.io/react/docs/thinking-in-react.html)
* [Getting Started with React](https://facebook.github.io/react/docs/getting-started.html)
* [React API](https://facebook.github.io/react/docs/top-level-api.html)
* [React Component](https://facebook.github.io/react/docs/component-api.html)
* [React Component Lifecycle](https://facebook.github.io/react/docs/component-specs.html)

## Setup

### Atom Editor

Install the [language-javascript-jsx](https://atom.io/packages/language-javascript-jsx) package in Atom.
Now you can view your JSX code with proper highlighting. :sunglasses:

### Chrome

Install the [React Chrome Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension in Chrome.
Now when you open the Chrome Dev Tools you will see a React tab with lots of good
	debugging information.

More info [on the React blog](https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html).

## Write a React Application

We will be writing a list tracking application.

Functionality:

* Title
* Display a list of items
* Add new items to the list
* Delete items from the list

### Planning

Basic steps of planning a React application:

1. Break it down into components. A mock of the application can help.
2. Write the components and render them with static data.
3. Identify which components need which data.
4. Store your state outside the components.
5. Provide a way for components to change state.

### Break it Down

Create a very simple, non-functioning, static, unstyled representation of
	your app in HTML.
From this mock, you should be able to draw many conclusions about how it
	would be broken down into components.

[HTML Mock](application/app-00/mock.html)

From this mock we can visually start to see the component hierarchy needed.

* `<ListApplication>` (top-level root component)
	* `<ListTitle>`
	* `<ListCreateItem>`
	* `<ListItems>`
		* `<ListItem>`

### Create Sample Data for the Application

We should be able to mock the data with a simple JavaScript object.
Make sure you consider what the minimal data needed is.

You can use this as a place to start in
`data.js`:
```js
var data = {

}
```

[Sample Mock Data](application/app-00/data.js)

### Run an HTTP server

In order for the JSXTransformer to work, we'll need to serve our files over HTTP.
Simply running the HTML file from `file://` will not work because of
	[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

A really easy way to run a static HTTP server is to install
	[http-server](https://www.npmjs.com/package/http-server).
Just install it globally with `npm install -g http-server`.
Then to run the HTTP server, go into a directory and run `http-server`.
Now load the page by going to http://localhost:8080/

### Write the Top-Level Component

*Your code should be similar to [app-00](application/app-00) at this point*

This is the component that starts the whole application.
A lot of times this is also the component that handles fetching data.
From here all data is passed down to child components.

In our case the top-level component is `<list-application>`.

First setup an `index.html` to provide an entry-point for the application:
```html
<!DOCTYPE html>
<html>
	<head>
		<title>My Favorite Colors</title>
		<!-- React Library -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
		<!-- React JSX Transformer Library -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
	</head>
	<body>
		<div id="listApplication"></div>
		<script src="data.js"></script>
		<script type="text/jsx" src="listApplication.jsx"></script>
	</body>
</html>
```

We will write the component for `<list-application>` in `listApplication.jsx`:
```js
var ListApplication = React.createClass({
	render: function () {
		return (
			<div>List Application</div>
		)
	}
});

React.render(<ListApplication/>, document.getElementById('listApplication'));
```

Try opening up `index.html` and see what the output looks like.

Now that we have an entry-point, we can extend `<listApplication>` with more components.

### Write Other Components

*Your code should be similar to [app-01](application/app-01) at this point*

Write the other components:
* `<ListTitle>`
* `<ListCreateItem>`
* `<ListItems>`
	* `<ListItem>`

#### `<listTitle>`

The simplest one is `<listTitle>`:
```js
var ListTitle = React.createClass({
	render: function () {
		return (
			<h1>{this.props.title}</h1>
		);
	}
});
```
We are specifying that the **text** displayed in our `<ListTitle>` component
	comes from a prop specified by the parent component.

Then for `<listApplication>`, add it to the render function:
```js
var ListApplication = React.createClass({
	render: function () {
		return (
			<div>
				<ListTitle title={this.props.title}></ListTitle>
			</div>
		);
	}
});

React.render(<ListApplication title={data.title}/>, document.getElementById('listApplication'));
```

Also notice in the last `React.render` line some props were added.
JSX will automatically pull `data` from the JS scope and apply them as props.

#### `<ListItems>` & `<ListItem>`

This component will keep track of `data.items` and display a list of them.

```js
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
```

```js
var ListApplication = React.createClass({
	render: function () {
		return (
			<div>
				<ListTitle title={this.props.title}></ListTitle>
				<ListItems items={this.props.items}></ListItems>
			</div>
		);
	}
});

React.render(<ListApplication items={data.items} title={data.title}/>, document.getElementById('listApplication'));
```

#### `<ListCreateItem>`

```js
var ListCreateItem = React.createClass({
	render: function () {
		return (
			<div>
				<input placeholder="new item text" /><button>Create</button>
			</div>
		);
	}
});
```

```js
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
```

*Currently is non-functional.*

### Wire up Events

*Your code should be similar to [app-02](application/app-02) at this point*

First include an eventEmitter library in your `index.html`:
```html
...
<head>
	<title>My Favorite Colors</title>
	<!-- React Library -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
	<!-- React JSX Transformer Library -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
	<!-- EventEmitter Library -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/EventEmitter/4.2.11/EventEmitter.min.js"></script>
</head>
...
```
[EventEmitter.js](https://github.com/Olical/EventEmitter)
	is a straightforward event emitter library for browsers.

Next create some functions around the data called *actions*.
If a child makes an *action* call to change the data, the parent will be notified
	so it can rerender.
We do this with an event emitter.

Create an `actions` object that provides functions to:
* Get data
* Create an item
* Delete an item

Make sure that when each of these actions are called,
	an event is fired to notify anyone listening of changes.

See [data](application/app-03/data.js) for an example.

Next convert te top-level component from a props based one to a state based one.
```js
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
```

A lot has changed here.
An event is registered to listen for changes and grabs the new state
	whenver it changes.
`this.props` was changed to `this.state` to reflect it is a state and not a
	passed in prop anymore.
It calls `actions.getData()` to populate its state.

To create a new event, hook up a method in the `<ListCreateItem>` component
	that calls `actions.createText`.
```js
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
```

And last, hook up the delete buttons to remove an item:
```js
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
```

### Finished Application

View [app-03](application/app-03) to see the finished application.

## Next Step

This concludes the Writing a React Application step.

This is the last step in this series.

If you would like to continue, consider one of these as your next step:
* Write an inbox application
* Research the Flux data pattern
* Compare an application written in React to a similar one written in Angular
