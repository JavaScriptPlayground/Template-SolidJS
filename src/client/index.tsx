import { render } from '@solid-js/web';
import { HashRouter, Route } from '@solid-js/router'
import { Home } from './pages/home/index.tsx';
import { NotFound } from './pages/404/index.tsx';
import './index.css'


render(
  () => <HashRouter>
    <Route path='/' component={Home}/>
    <Route path='/404' component={NotFound}/>
  </HashRouter>,
  globalThis.document.body
);
