import type {JSXElement} from '@solid-js'
import './index.css'


export function Home() : JSXElement {
  return (
    <div class='page home'>
      <h1 class='title'>Home</h1>
      <img class='logo' src='/static/solidjs_logo.svg' alt='SolidJS Logo'/>
      <a class='link' href='/404'>Go to 404</a>
    </div>
  )
}
