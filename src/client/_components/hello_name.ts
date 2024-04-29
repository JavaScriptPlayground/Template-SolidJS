import { customElement, property } from '../../../deps/lit/decorators.ts';
import { LitElement, type TemplateResult, html } from '../../../deps/lit.ts';

const styles = await import("./hello_name.scss");


@customElement('hello-name')
export class HelloName extends LitElement {

  static style = styles;

  @property()
  name = 'Somebody';

  render() : TemplateResult {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
