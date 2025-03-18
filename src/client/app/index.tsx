import { render } from "@solid-js/web";
import { Route, Router } from "@solid-js/router";
import { Home } from './pages/home/index.tsx';

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
