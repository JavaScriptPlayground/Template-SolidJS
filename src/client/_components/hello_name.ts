/// declare 
import { customElement, property } from '../../../deps/lit/decorators.ts';
import { LitElement, TemplateResult, html } from '../../../deps/lit.ts';

import styles from './hello_name.scss'

@customElement('hello-name')
export class HelloName extends LitElement {

  static styles = styles;

  @property()
  name = 'Somebody';

  render() : TemplateResult {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
