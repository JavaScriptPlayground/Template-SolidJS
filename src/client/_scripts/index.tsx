console.log('Template')

import { render } from "@solid-js/web";
import { createSignal, type JSX } from "@solid-js";

function Counter() : JSX.Element {
  const [count, setCount] = createSignal(1);
  const increment = () => setCount(count => count + 1);

  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app")!);