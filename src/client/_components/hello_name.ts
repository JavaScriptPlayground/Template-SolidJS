import { customElement, property } from '../../../deps/lit/decorators.ts';
import { LitElement, TemplateResult, html } from '../../../deps/lit.ts'

@customElement('hello-name')
export class HelloName extends LitElement {

  @property()
  name = 'Somebody';

  render() : TemplateResult {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
