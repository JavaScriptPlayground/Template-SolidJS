import { render } from "@solid-js/web";
import { Route, Router } from "@solid-js/router";
import { createSignal, type JSXElement } from "@solid-js";
import { Home } from './pages/home/index.tsx';

function App() : JSXElement {
  const [count, setCount] = createSignal(1);
  const increment = () => setCount(count => count + 1);

  return (
    <div class='app'>
      <h1 class='title'>Home</h1>
      <img class='logo' src='/static/solidjs_logo.svg' alt='SolidJS Logo' />
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
render(
  () => <Router>
    <Route path={["/app", "/app/", "/app/home"]} component={Home} />
  </Router>, 
  root
);
