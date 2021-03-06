import { IPropertiesService } from "./IPropertiesService";
import { IProperty } from './IProperty';
import { IDesignItem } from '../../item/IDesignItem';

export class PolymerPropertiesService implements IPropertiesService {
    
    public name = "polymer"

    isHandledElement(designItem: IDesignItem): boolean {
        return (<any>designItem.element.constructor).polymerElementVersion != null;
    }

    getProperties(designItem: IDesignItem): IProperty[] { //todo support typescript enums
        if (!this.isHandledElement(designItem))
            return null;

        let properties: IProperty[] = [];
        let list = (<any>designItem.element.constructor).properties;
        for (const name in list) {
            const polymerProperty = list[name];
            if (polymerProperty === String) {
                let property: IProperty = { name: name, type: "string", service: this };
                properties.push(property);
            } else if (polymerProperty === Object) {
                let property: IProperty = { name: name, type: "string", service: this };
                properties.push(property);
            } else if (polymerProperty === Number) {
                let property: IProperty = { name: name, type: "number", service: this };
                properties.push(property);
            } else if (polymerProperty === Date) {
                let property: IProperty = { name: name, type: "date", service: this };
                properties.push(property);
            } else {
                if (polymerProperty.type === String) {
                    let property: IProperty = { name: name, type: "string", service: this };
                    properties.push(property);
                } else if (polymerProperty.type === Object) {
                    let property: IProperty = { name: name, type: "string", service: this };
                    properties.push(property);
                } else if (polymerProperty.type === Number) {
                    let property: IProperty = { name: name, type: "number", service: this };
                    properties.push(property);
                } else if (polymerProperty.type === Date) {
                    let property: IProperty = { name: name, type: "date", service: this };
                    properties.push(property)
                }
                else {
                    let property: IProperty = { name: name, type: "string", service: this };
                    properties.push(property);
                }
            }
        }
        return properties;
    }

    setValue(designItem: IDesignItem, property: IProperty, value: any) {
        //let oldValue = (<HTMLElement>designItem.element)[property.name];

        //let doFunc = () => (<HTMLElement>designItem.element).setAttribute(this._camelToDashCase(property.name), value);
        //let undoFunc = () => (<HTMLElement>designItem.element).setAttribute(this._camelToDashCase(property.name), oldValue);

        /*serviceContainer.actionHistory.add(UndoItemType.Update, this.activeElement,
            {
              type: detail.type, name: detail.name,
              new: { value: detail.value },
              old: { value: oldValue }
            });*/
    }

    getValue(designItem: IDesignItem, property: IProperty) {
        return (<HTMLElement>designItem.element)[property.name];
    }

    /*private _camelToDashCase(text: string){
        return text.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
    }*/
}