---
layout: "../../layouts/Blog.astro"
poster: "https://source.unsplash.com/random?web-development"
title: "Today in Web Development"
subtitle: "What I do and learn, day to day, in Web Development"
---

## Table of Contents

[<span style="color: red;">How to Add ESLint to Your React Project</span>](#how-to-add-eslint-to-your-react-project)

[<span style="color: red;">Add a Meteor Effect to Your React Project</span>](#add-a-meteor-effect-to-your-react-project)

[<span style="color: red;">Learn Svelte by Making a Calculator</span>](#learn-svelte-by-making-a-calculator)

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

### Learn Svelte by Making a Calculator

[<span style="color: red;">Svelte</span>](https://svelte.dev/) is a powerful open-source front-end framework that compiles your declarative components into efficient JavaScript code. It's designed for building user interfaces and web applications with a focus on speed and minimal runtime overhead. If you're new to programming and want to learn Svelte, this guide will walk you through creating a simple calculator application. Let's get started!

#### Prerequisites

Before we begin, make sure you have Node.js and npm (Node Package Manager) installed on your computer. You can download and install them from the official [<span style="color: red;">Node.js</span>](https://nodejs.org/) website.

#### Create a New Svelte Project

To create a new Svelte project, open your terminal and run the following command:

```bash
npm create svelte@latest calculator
```

Follow the prompts. At the time of this writing, the latest version of Svelte is 3.38.2.

**Which Svelte app template?** Select **Skeleton project (Barebones scaffolding for your new SvelteKit app)**.

**Add type checking with TypeScript?** Select **Yes, using TypeScript syntax**.

**Select additional options (use arrow keys/space bar)**

- Select **Add ESLint for code linting**
- Select **Add Prettier for code formatting**.

This will create a new Svelte project in the **calculator** directory. Change into the **calculator** directory and run the following command:

```bash
npm install
```

This will install all the dependencies for the project.

#### Running the Development Server

You're ready to start the development server:

```bash
npm run dev
```

This will start the development server, and you should see an initial Svelte app template displayed in your browser. Don't worry; we'll replace this with our calculator interface.

#### Creating the Calculator Interface

Open the <span style="color: red;">src\routes\+page.svelte</span> file in your code editor. This is where we'll build our calculator.

```html
<div class="calculator">
	<div class="display">
		{display_number.length <= 10 ? display_number : display_number.substring(0, 10)}
	</div>
	<div class="buttons">
		<button on:click={select(7)}>7</button>
		<button on:click={select(8)}>8</button>
		<button on:click={select(9)}>9</button>
		<button on:click={select(4)}>4</button>
		<button on:click={select(5)}>5</button>
		<button on:click={select(6)}>6</button>
		<button on:click={select(1)}>1</button>
		<button on:click={select(2)}>2</button>
		<button on:click={select(3)}>3</button>
		<button on:click={select(0)}>0</button>
		<button on:click={select('.')}>.</button>
		<button on:click={toggleSign}>+/-</button>
		<button on:click={() => operation(operators[0])} class="operator">+</button>
		<button on:click={() => operation(operators[1])} class="operator">/</button>
		<button on:click={() => operation(operators[2])} class="operator">*</button>
		<button on:click={() => operation(operators[3])} class="operator">-</button>
		<button on:click={equals} class="equals">=</button>
		<button on:click={clear} class="clear">C</button>
	</div>
</div>
```

`<div class="calculator">`: This is a container for our calculator. We're setting it up as a visual boundary for our calculator component.

`<div class="display">`: This is a container for displaying the numbers and calculations. It's where you'll see the input and results.

`{display_number.length <= 10 ? display_number : display_number.substring(0, 10)}`: This is a special Svelte syntax. It's displaying the display_number, but if it's longer than 10 digits, it shows only the first 10 digits. This is done to prevent the display from overflowing. Standard calculators have a fixed display size, so we're doing the same here.

`<div class="buttons">`: This is another container. It's where all the buttons for numbers, operators, and special functions will be placed.

`buttons for the numbers 0-9, the decimal point, and a "+/-" button`. Each button has an on:click attribute. When the button is clicked, it triggers a specific function.

For example, `<button on:click={select(7)}>7</button>` means that when you click the "7" button, it will call the select function with the argument 7. This function is responsible for handling number input.

`addition (+), division (/), multiplication (\*), and subtraction (-)`. They also have on:click attributes, but they use an arrow function (() =>) to call the operation function with the respective operator from the operators array.

`(=) and clear (C) buttons`. They also have on:click attributes that call the equals and clear functions when clicked. The class attribute can be used for styling, e.g., to make the equals button look different from the clear button.

`class="operator"` attribute, which can be used for styling to distinguish them from other buttons.

#### Explanation of the Interface

We've created a container with the class "**_calculator_**" to house our calculator. Inside, there's a display area with the class "**_display_**." The display content is dynamically adjusted to fit within 23 characters or less. The buttons are organized within a container with the class "**_buttons_**." Number buttons (0-9) are set to call the select function when clicked. Special buttons like the decimal point and plus/minus sign also call the select function. Operator buttons (+, /, \*, -) trigger the operation function with the corresponding operator. The equals (=) button calculates the result using the equals function. The clear (C) button resets the calculator with the clear function.

This will show a **500 Internal Error**. This is because we have not created the functions yet. We will do that soon after we add some styling to the skeleton html above.

#### Adding Styling

Now, let's make our calculator look good with some CSS. Add the following CSS to your <span style="color: red;">src\routes\+page.svelte</span> file:

```html
<style>
  button {
    border-radius: 0.25rem; /* 4px */
    border: none;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
    padding: 0.625rem; /* 10px */
    text-align: center;
  }

  button:hover {
    background: #e5e7eb;
  }

  .buttons {
    display: grid;
    gap: 0.25rem; /* 4px */
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .calculator {
    background-color: #000;
    border-radius: 0.375rem; /* 6px */
    border: 1px solid rgb(214 211 209);
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0.625rem; /* 10px */
    width: 91.666667%;

    /* Center the calculator vertically and horizontally */
    align-items: center;
    display: flexbox;
    flex-direction: column;
    font-family: Arial, sans-serif;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .clear {
    background: #dc2626;
    border: 0px solid #000;
  }

  .clear:hover {
    background: #fecaca;
  }

  .display {
    border: 1px solid rgb(214 211 209);
    color: white;
    font-size: 3rem; /* 48px */
    line-height: 2.5rem; /* 40px */
    margin-bottom: 0.625rem; /* 10px */
    min-height: 2.5rem; /* 40px */
    padding: 0.625rem; /* 10px */
    text-align: right;
  }

  .equals {
    background: #2563eb;
    border: 0px solid #000;
  }

  .equals:hover {
    background: #bae6fd;
  }

  .operator {
    background: #f59e0b;
    border: 0px solid #a16207;
  }

  .operator:hover {
    background: #facc15;
  }

  @media (min-width: 768px) {
    button {
      font-size: 3rem; /* 48px */
      line-height: 1;
    }

    .buttons {
      gap: 0.875rem; /* 14px */
    }

    .display {
      font-size: 8rem; /* 128px */
      line-height: 1;
      min-height: 8rem; /* 80px */
    }
  }

  @media (min-width: 1024px) {
    button {
      font-size: 6rem; /* 96px */
      line-height: 1;
    }

    .buttons {
      gap: 1rem; /* 16px */
    }

    .display {
      font-size: 8rem; /* 128px */
      min-height: 8rem; /* 80px */
    }
  }
</style>
```

#### Adding Functionality

Now that we have the interface in place, let's add the JavaScript logic to make the calculator work. Add the following JavaScript code inside a `<script>` tag:

```js
// Wrap event listener code inside onMount
import { onMount } from "svelte";

onMount(() => {
  // Add event listeners for keyboard input
  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("keyup", handleKeyUp);
});

let keyHeld = false; // To track if a key is held down

// Handle keyboard input
/**
 * 	 * @param {{ key: any; }} event
 */
function handleKeyPress(event) {
  if (!keyHeld) {
    keyHeld = true;
    const key = event.key;

    if (key === "Enter") {
      // Handle Enter key as equals
      equals();
    } else if (!isNaN(key) || key === ".") {
      // Handle numeric keys or decimal point
      select(key)();
    } else if (key === "+/-") {
      // Handle plus/minus key
      toggleSign();
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      // Handle operator keys
      operation(key);
    } else if (key === "Escape") {
      // Handle Escape key as clear
      clear();
    }
  }
}

// Handle key release
function handleKeyUp() {
  keyHeld = false;
}

let display_number = "0";

const select = (/** @type {string | number} */ num) => () =>
  display_number === "0"
    ? (display_number = num.toString())
    : (display_number += num);

const clear = () => (display_number = "0");

/**
 * @type {number | undefined}
 */
let operand;
/**
 * @type {number | undefined}
 */
let result;

function equals() {
  // result is here to resolve a null issue with type checking.
  result = 0;
  const displayNumberAsNumber = Number(display_number);

  if (!isNaN(displayNumberAsNumber) && operand !== undefined) {
    switch (operator) {
      case "+":
        result = operand + displayNumberAsNumber;
        break;
      case "-":
        result = operand - displayNumberAsNumber;
        break;
      case "*":
        result = operand * displayNumberAsNumber;
        break;
      case "/":
        result = operand / displayNumberAsNumber;
        break;
      default:
        break; // Handle any other operator or no operator
    }
    display_number = result.toString();
  }
}

/**
 * @type {string | undefined}
 */
let operator;
let operators = ["+", "/", "*", "-"];

/**
 * @param {string} sign
 */
function operation(sign) {
  operand = Number(display_number);
  operator = sign;
  display_number = "";
}

function toggleSign() {
  if (display_number !== "0") {
    display_number = display_number.startsWith("-")
      ? display_number.slice(1)
      : "-" + display_number;
  }
}
```

#### JavaScript Explanation

We've defined several variables to keep track of the calculator's state, including the current input, previous input, the operator, and an array of valid operators. The **_select_** function handles number and decimal point input. It ensures that the input is displayed correctly on the screen. The **_toggleSign_** function allows users to toggle the sign of the number (positive/negative). The **_operation_** function is called when an operator button is clicked. It stores the current input and sets the operator for future calculations. The **_equals_** function calculates the result based on the operator and operands, updating the display accordingly. The **_clear_** function resets the calculator to its initial state.

#### Wrapping Up

That's it! You've created a simple calculator using Svelte. You can find the source code for this project on [<span style="color: red;">GitHub</span>](https://github.com/milliorn/learning-playgrounds/tree/main/svelte-calculator)

If you wish to get a perfect score with Lighthouse, you can add the following code to your <span style="color: red;">src\app.html</span> file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width" />
    <meta
      name="description"
      content="This is a brief description of my web page content."
    />
    <title>Svelte Calculator</title>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
  <style>
    html {
      background-color: #222;
    }
  </style>
</html>
```

This will set a dark background color for the page, add a description for the page, and set the title of the page. This will also set the preload data to hover.
