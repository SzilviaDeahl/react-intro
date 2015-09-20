# An Intro to React

**This is the first step of the series.**
**To view other steps, please check out another branch.**

In this step gives an overview of React.

<img src="http://facebook.github.io/react/img/logo.svg" width="200"/>

## Objectives

* Discuss why the virtual DOM gives React an advantage.
* Discuss why a unidirectional data flow can benefit development.

## Resources

* [React](https://facebook.github.io/react/)

## Overview of React

### What is React?

React is a view library by Facebook.

React is a powerful tool for only a couple reasons:
* Does one thing and does it well. That "one thing" being a view library.
* Everything is a **component** in React.
* Updates the DOM very quickly using React's **virtual DOM**.

### What does React code look like?

`index.html`:
```html
<!DOCTYPE html>
<html>
	<head>
		<!-- React Library -->
		<script src="build/react.js"></script>
		<!-- React JSX Transformer Library -->
		<script src="build/JSXTransformer.js"></script>
	</head>
	<body>
		<!-- Hello World App Insertion Point -->
		<div id="hello"></div>
		<!-- Hello World App -->
		<script type="text/jsx" src="hello.jsx"></script>
	</body>
</html>
```

`helloworld.jsx`:
```js
React.render(
	<h1>Hello, world!</h1>,
	document.getElementById('hello')
);
```

### What is JSX?

Notice `helloworld.jsx` isn't JS, it is JSX.
JSX is JavaScript with some [React sugar](https://facebook.github.io/react/docs/jsx-in-depth.html) built into it.
JSX enables you to write HTML-esque code straight into your JS.
It is very similiar to other templating libraries.

Let's take a look at `helloworld.jsx` again`:
```js
React.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```
Notice `<h1>Hello, world!</h1>` is inserted into the middle of the code.
That looks like HTML! Not JS!

JSX is optional and React can actually be written in JS:
```js
React.render(
	React.createElement('h1', null, 'Hello, world!'),
	document.getElementById('example')
);
```
Most people agree the JSX version is much cleaner,
easier to read, and easier to write.
If you have a negative gut-reaction to JSX,
[just give it five minutes](https://signalvnoise.com/posts/3124-give-it-five-minutes).

### Components

React forces you to break your application down into components.
A component is any individual piece of functionality in your UI.
Components allow for reusability, easier testing, and encapsulation.

Examples of components:
* `<shopping-cart products={this.state.products}></shopping-cart>`
* `<profile name={this.state.name} pic={this.state.picture}></profile>`
* `<side-bar choices={this.state.pages}></side-bar>`

### What is the Virtual DOM?

The virtual DOM is what allows React to render so fast.
It creates an in-memory version of the DOM in JS.
Anytime something in the virtual DOM changes, it diffs it against the real DOM.
If it detects a change, it only touches the parts of the DOM that changed.
The only reason this is fast is because the browser DOM is very slow.

In addition to being fast, it also allows React to be rendered elsewhere.
It can be rendered on a server for SEO purposes.
Or it can be rendered on a phone using something like [React Native](https://facebook.github.io/react-native/).

## Next Step

This concludes the overview of React.
Checkout the next branch, `step-01`, to continue.

In the next step we will build a simple React application.
