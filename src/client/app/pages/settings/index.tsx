import type {JSXElement} from '@solid-js'

import './index.css'

export function Settings() : JSXElement {
  return (
    <div class='settings'>
      <h1 class='title'>Home</h1>
      <img class='logo' src='/static/solidjs_logo.svg' alt='SolidJS Logo'/>
    </div>
  )
}
