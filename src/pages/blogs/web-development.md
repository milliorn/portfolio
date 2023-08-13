---
layout: "../../layouts/Blog.astro"
poster: "https://source.unsplash.com/random?web-development"
title: "Today in Web Development"
subtitle: "What I do and learn, day to day, in Web Development"
---

## Table of Contents

[<span style="color: red;">How to Add ESLint to Your React Project</span>](#how-to-add-eslint-to-your-react-project)

[<span style="color: red;">Add a Meteor Effect to Your React Project</span>](#add-a-meteor-effect-to-your-react-project)

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

### Add a Meteor Effect to Your React Project

[<span style="color: red;">Perseid Meteor Shower</span>](https://www.space.com/32868-perseid-meteor-shower-guide.html) is happening as I write this blog post. I thought it would be cool to add a meteor effect to my React project.

Here is a walkthrough of how I did it.

First, I created a new React project using the following command:

```bash
npx create-next-app@latest meteor-effect --typescript --eslint
```

It will ask you a series of questions. I answered them as follows:

```bash
 Would you like to use Tailwind CSS? » Yes
 Would you like to use `src/` directory? » Yes
 Would you like to use App Router? (recommended) » No
 Would you like to customize the default import alias? » No
```

Now, change into the <span style="color: red;">meteor-effect</span> directory and run the following command:

```bash
npm install -D tailwindcss postcss autoprefixer
```

then run the following command:

```bash
npx tailwindcss init -p
```

This installs Tailwind CSS, PostCSS, and Autoprefixer. For more information on these installation, visit the [<span style="color: red;">Install Tailwind CSS with Next.js
</span>](https://tailwindcss.com/docs/guides/nextjs)

Next, open the <span style="color: red;">tailwind.config.js</span> file and add the following code to it:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Next, open the <span style="color: red;">styles/global.css</span> file and add the following code to it:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Sets the background color of the body to black because it would not work in the component */
* {
  background-color: #000;
}
```

Next, you need to install the `clsx` package. Run the following command:

```bash
npm install --save clsx
```

To learn more about this package you can visit the Github page at [<span style="color: red;">https://github.com/lukeed/clsx
</span>](https://github.com/lukeed/clsx)

The next step is up to you, but for simplicity, you can add this code to the <span style="color: red;">pages/index.tsx</span> file:

```tsx
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Home() {
  // Initialize state for random number
  const [randomNumber, setRandomNumber] = useState<number>(10);

  // Effect to generate and update random number between 50 and 100 on mount
  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    setRandomNumber(newRandomNumber);
  }, []); // The empty array ensures this effect runs only on mount and unmount

  // Initialize state for meteor styles
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  // Effect to calculate meteor styles dynamically on mount
  useEffect(() => {
    // Generate a rate between 50 and 100 for the number of meteors
    const rate = Math.floor(Math.random() * (100 - 50 + 1)) + 10;
    // Creates an array of the desired length without filling the array with any specific values, which aligns with the purpose of creating an array to represent the number of meteors you want to render.
    const meteors = Array.from({ length: rate });

    // Calculate meteor styles dynamically here
    const newStyles = meteors.map(() => ({
      // Generate animation delay and duration for each meteor
      animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
      animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
      // Set left and top to 70 to prevent overflow issues with meteors
      left: `${Math.random() * 70}vw`,
      top: `${Math.random() * 70}vh`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }));
    setMeteorStyles(newStyles);
  }, []);

  // Render the meteors
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="meteors-container">
        {meteorStyles.map((style, idx) => (
          <span
            key={"meteor" + idx}
            className={clsx(
              "animate-meteor-effect absolute h-1 w-1 rounded-[9999px] bg-blue-400 shadow-[0_0_0_8px_#ffffff10] rotate-[215deg]",
              "before:content-[''] before:absolute before:transform before:-translate-y-1/2 before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#2196F3] before:to-transparent"
            )}
            style={style}
          ></span>
        ))}
      </div>
    </div>
  );
}
```

Now, this will not animate the meteors just yet. You need to update your <span style="color: red;">tailwind.config.js</span> file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
```

Now, you should see the meteors animate on the page. This will animate the meteors in a straight line from left to right. You can change the animation to make the meteors fall at an angle. This above will have them fall at a rate of 5 seconds.

When finished, if everything was done correctly, you should see something like this:
[<span style="color: red;">https://github.com/milliorn/react-components/blob/main/meteor-effect/public/meteors.png
</span>](https://github.com/milliorn/react-components/blob/main/meteor-effect/public/meteors.png)

You can find the source code for this project on [<span style="color: red;">GitHub</span>](https://github.com/milliorn/react-components) under the [<span style="color: red;">meteor-effect</span>](https://github.com/milliorn/react-components/tree/main/meteor-effect) folder.
