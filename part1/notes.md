### a. Introduction to React

> The first rule of frontend web development:
>> *keep the console open all the time*
>
> Let us repeat this together: *I promise to keep the console open all the time* during this course, and for the rest of my life when I'm doing web development.

> when writing JSX, the tag needs to be closed

> Software development is hard. It gets even harder if one is not using all the possible available tools such as the web-console and debug printing with `console.log`. Professionals use both all the time and there is no single reason why a beginner should not adopt the use of these wonderful helper methods that will make life so much easier.

> First letter of React component names must be capitalized

### b. JavaScript

> In certain circles, it has also been popular to attempt "simulating" Java features and design patterns in JavaScript. We do not recommend doing this as the languages and respective ecosystems are ultimately very different.

> When using React, techniques from functional programming are often used. One characteristic of the functional programming paradigm is the use of immutable data structures. In React code, it is preferable to use the method concat, which creates a new array with the added item.

### c. Component state, event handlers

> React's own official tutorial suggests: "In React, it’s conventional to use onSomething names for props which take functions which handle events and handleSomething for the actual function definitions which handle those events."

> By convention, event handler props should start with on, followed by a capital letter. For example, the Button component’s onClick prop could have been called onSmash.

### d. A more complex state, debugging React apps

> Some readers might be wondering why we didn't just update the state directly, The application appears to work. However, it is forbidden in React to mutate state directly, since it can result in unexpected side effects.

> don't write more code but rather find and fix the problem immediately. There has yet to be a moment in the history of coding where code that fails to compile would miraculously start working after writing large amounts of additional code. I highly doubt that such an event will transpire during this course either.

> The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.

