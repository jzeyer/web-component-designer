import { IProperty } from './services/propertiesService/IProperty';
import { ServiceContainer } from './services/ServiceContainer';
import { BaseCustomWebComponent, css } from './controls/BaseCustomWebComponent';

export class AttributeEditorAttributeList extends BaseCustomWebComponent {

  public serviceContainer: ServiceContainer;

  private _div: HTMLDivElement;

  static get style() {
    return css`
    :host{
      display: block;
      height: 100%;
      overflow: auto;
      box-sizing: border-box;
    }
    .content-wrapper {
      padding: .5em;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      grid-auto-rows: 30px;
    }
    label, input, select {
      display: inline-block;
      color: white;
      background: transparent;
      height: 24px;
      margin: 2px 0;
      padding: 0 2px 0 4px;
      width: 110px;
      white-space: nowrap;
    }
    label, .style-label {
      box-sizing: border-box;
      display: inline-block;
      margin-right: 20px;
      font-size: 13px;
      width: 90px;
    }
    label[for] {
      cursor: pointer;
    }
    input, select {
      border: 1px solid var(--input-border-color);
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 11px;
      width: 100%;
    }
    /*input {
      margin-left: 4px;
    }*/
    input[disabled] {
      color: #BDBDBD;
    }
    select {
      background: transparent;
    }
    select:focus option {
      color: black;
    }
    `;
  }

  constructor() {
    super();
   
    this._div = document.createElement("div");
    this._div.className = "content-wrapper";
    this.shadowRoot.appendChild(this._div);
  }

  public createElements(properties: IProperty[]) {
    for (const p of properties) {
      let element: HTMLElement;
      if (p.createEditor)
        element = p.createEditor(p);
      else {
        element = this.serviceContainer.forSomeServicesTillResult("editorTypesService", x => x.getEditorForProperty(p));
      }
      if (element) {
        let label = document.createElement("label");
        label.htmlFor = p.name;
        label.textContent = p.name;
        this._div.appendChild(label);

        element.id = p.name;
        this._div.appendChild(element);
      }
    }
  }
}

customElements.define('node-projects-attribute-editor-attribute-list', AttributeEditorAttributeList);