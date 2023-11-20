import { LightningElement, track } from 'lwc';
import startPage1 from "./startPage1.html";
import startPage2 from "./startPage2.html";

export default class StartPageController extends LightningElement {

    @track name;
    firstTemplate = true;

    onGetName(event) {
        this.name = event.detail.value;
        console.log(event);
    }

    onStart() {
        this.dispatchEvent(new CustomEvent('start', {
            detail: this.name
        }));
    }

    changeTemplate() {
        this.firstTemplate = !this.firstTemplate;
    }

    render() {
        return this.firstTemplate ? startPage1 : startPage2;
    }

    onResultPage() {
        this.dispatchEvent(new CustomEvent('gameoverpage', {}));
    }
}