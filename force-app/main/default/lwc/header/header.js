import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {

    @api energy
    @api result

    onStart() {
        this.dispatchEvent(new CustomEvent('start'));
    }
    
}