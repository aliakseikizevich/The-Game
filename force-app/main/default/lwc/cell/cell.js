import { LightningElement, api, track, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext, publish } from 'lightning/messageService';
import gameConnection from '@salesforce/messageChannel/gameConnection__c';

export default class Cell extends LightningElement {

    subscription = null;

    @api cell;
    @track isPlayer = false;
    @track isTarget = false;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();   
    }

    onCellEvent(message) {
        if (message.recordData == 'player') this.onPlayerMove(message);
        if (message.recordData == 'target') this.onGenerateTarget(message);
        if (this.isPlayer && this.isTarget) {
            this.isTarget = false;
            this.dispatchEvent(new CustomEvent('createtarget'));
        }
    }

    onPlayerMove(message) {
        if (message.recordId === this.cell.id) {
            this.isPlayer = true;
        } else {
            this.isPlayer = false;
        }
    }

    onGenerateTarget(message) {
        if (message.recordId === this.cell.id) {
            this.isTarget = true;
        } else {
            this.isTarget = false;
        }
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                gameConnection,
                (message) => this.onCellEvent(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}