import { LightningElement, track } from 'lwc';

export default class GameController extends LightningElement {

    onMove(event) {
        const moveEvent = new CustomEvent('move', {
            detail: event.target.value
        });
        this.dispatchEvent(moveEvent);
    }
}