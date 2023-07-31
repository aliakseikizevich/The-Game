import { LightningElement, track } from 'lwc';

export default class StartPage extends LightningElement {

    @track name;

    onGetName(event) {
        this.name = event.detail.value;
        console.log(event);
    }

    onStart() {
        this.dispatchEvent(new CustomEvent('start', {
            detail: this.name
        }));
    }
}