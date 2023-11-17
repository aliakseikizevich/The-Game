import { LightningElement, api, track, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext, publish } from 'lightning/messageService';
import gameConnection from '@salesforce/messageChannel/gameConnection__c';

export default class Cell extends LightningElement {

    subscription = null;

    @api cell;
    @track isPlayer = false;
    @track isTarget = false;
    @track objects = {
        player: 'player',
        target: 'target'
    };

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();   
    }

    changeValues(message) {
        if (message.oldId != this.cell.id && message.newId != this.cell.id) {
            return;
        }
        if (message.oldId === this.cell.id) {
            this.setValues(message, false);
        }
        if (message.newId === this.cell.id) {
            this.setValues(message, true);
        }
        if (this.isPlayer && this.isTarget) {
            this.deleteTarget();
        }
    }

    setValues(message, value) {
        if (message.player) {
            this.isPlayer = value;
        } else if (message.target) {
            this.isTarget = value;
        }
    }

    deleteTarget() {
        this.isTarget = false;
        this.dispatchEvent(new CustomEvent('createtarget'));
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                gameConnection,
                (message) => this.changeValues(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}