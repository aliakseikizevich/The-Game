import { LightningElement, api } from 'lwc';

export default class Playground extends LightningElement {

    @api cells;

    onMove(event) {
        this.dispatchEvent(new CustomEvent('move', {
            detail: event.detail
        }));
    }

    onCreateTarget() {
        this.dispatchEvent(new CustomEvent('createtarget'));
    }

    onStart() {
        this.dispatchEvent(new CustomEvent('start'));
    }

    onStop() {
        this.dispatchEvent(new CustomEvent('stop'));
    }
}