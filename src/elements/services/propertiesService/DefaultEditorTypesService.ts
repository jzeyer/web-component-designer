import { IEditorTypesService } from "./IEditorTypesService";
import { IProperty } from './IProperty';

export class DefaultEditorTypesService implements IEditorTypesService {
    getEditorForProperty(property: IProperty): HTMLElement {
        if (property.createEditor)
            return property.createEditor(property);

        switch (<string><any>property.type) {
            case "color":
                {
                    let element = document.createElement("input");
                    element.type = "color"
                    return element
                }
            case "date":
                {
                    let element = document.createElement("input");
                    element.type = "datetime-local"
                    return element
                }
            case "number":
                {
                    let element = document.createElement("input");
                    element.type = "number"
                    element.min = <string><any>property.min;
                    element.max = <string><any>property.max;
                    return element
                }
            case "list":
                {
                    let element = document.createElement("select");
                    for (let v of property.values) {
                        let option = document.createElement("option");
                        option.value = v;
                        option.text = v;
                        element.appendChild(option);
                    }
                    return element
                }
            case "css-length":
            case "thickness":
            case "string":
            default:
                {
                    let element = document.createElement("input");
                    element.type = "text"
                    return element
                }
        }
    }
}