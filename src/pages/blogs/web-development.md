---
layout: "../../layouts/Blog.astro"
poster: "https://source.unsplash.com/random?web-development"
title: "Today in Web Development"
subtitle: "What I do and learn, day to day, in Web Development"
---

## Table of Contents

- [<span style="color: red;">How to Add ESLint to Your React Project</span>](#how-to-add-eslint-to-your-react-project)

### How to Add ESLint to Your React Project

[ESLint](https://eslint.org/) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs. In many ways, it is similar to JSLint and JSHint with a few exceptions:

- ESLint uses Espree for JavaScript parsing.
- ESLint uses an AST to evaluate patterns in code.
- ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

ESLint is designed to be completely configurable, meaning you can turn off every rule and run only with basic syntax validation, or mix and match the bundled rules and your custom rules to make ESLint perfect for your project.

ESLint supports ES6/ES2015 and allows you to quickly add rules to your project that catch common errors and enforce style preferences.

ESLint is written using Node.js and requires at least Node.js 8.10. You can install ESLint using npm:

```bash
npm install eslint eslint-plugin-react --save-dev
```

Create a <span style="color: red;">eslintrc.json</span> file in the root of your project's directory and add the following code to it:

```js
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react"],
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
}

```

Add the following code to your <span style="color: red;">package.json</span> file:

```js
"scripts": {
  "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx ."
}
```

Run the following command to lint your code:

```bash
npm run lint
```

If you want to lint your code automatically when you save a file, run the following command:

```bash
npm install eslint-watch --save-dev
```

Add the following code to your <span style="color: red;">package.json</span> file:

```js
"scripts": {
  "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx .",
  "lint:watch": "esw -w --clear --ext .js,.jsx,.ts,.tsx ."
}
```

Run the following command to lint your code:

```bash
npm run lint:watch
```

To learn more about the flags used in the above commands, visit the [<span style="color: red;">ESLint Command Line Interface Reference</span>](https://eslint.org/docs/user-guide/command-line-interface).

To learn more about the rules used in the above configuration, visit the [<span style="color: red;">ESLint Rules</span>](https://eslint.org/docs/rules/) page.

To learn more about the plugins used in the above configuration, visit the [<span style="color: red;">ESLint Plugins</span>](https://eslint.org/docs/user-guide/configuring/plugins) page.

To learn more about the environments used in the above configuration, visit the [<span style="color: red;">ESLint Environments</span>](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments) page.

To learn more about the parser options used in the above configuration, visit the [<span style="color: red;">ESLint Parser Options</span>](https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options) page.

To learn more about the configuration used in the above configuration, visit the [<span style="color: red;">ESLint Configuration</span>](https://eslint.org/docs/user-guide/configuring) page.
