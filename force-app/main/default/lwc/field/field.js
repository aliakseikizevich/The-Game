import { LightningElement, api } from 'lwc';

export default class Field extends LightningElement {

    @api cells; 

    onCreateTarget() {
        this.dispatchEvent(new CustomEvent('createtarget'));
    }
}
