import { customElement, property } from '../../../deps/lit/decorators.ts';
import { LitElement, type TemplateResult, html } from '../../../deps/lit.ts';

// @deno-types="../../../types/scss.d.ts"
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
