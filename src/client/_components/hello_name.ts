import {LitElement, TemplateResult, customElement, html, property} from '../../../deps/lit.ts'

@customElement('hello-name')
export class HelloName extends LitElement {

  @property()
  name = 'Somebody';

  render() : TemplateResult {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
