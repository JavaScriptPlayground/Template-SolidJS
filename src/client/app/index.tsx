import { render } from "@solid-js/web";
import { createSignal, type JSXElement } from "@solid-js";

import './index.scss'

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

const root = globalThis.document.getElementById("root")
if (!root) {
  throw new Error('No root element found.')
}
render(() => <App/>, root);
