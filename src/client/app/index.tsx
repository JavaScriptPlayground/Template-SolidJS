import styles from './index.scss'

import { render } from "@solid-js/web";
import { createSignal, type JSXElement } from "@solid-js";

function App() : JSXElement {
  const [count, setCount] = createSignal(1);
  const increment = () => setCount(count => count + 1);

  return (
    <div class='app'>
      <h1 class='title'>Home</h1>
      <img class='logo' src='/-/solidjs_logo.svg' alt='SolidJS Logo' />
      <button type='button' onClick={increment}>
        {count()}
      </button>
    </div>
  );
}

render(() => <App/>, document.getElementById("root")!);
