import { LightningElement, api, wire, track } from 'lwc';
import saveResult from '@salesforce/apex/ResultService.saveResult';
import getResults from '@salesforce/apex/ResultService.getTopResults';

export default class GameOverPage extends LightningElement {

    @api result;
    @api name;

    @track results;
    @track columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Result', fieldName: 'Value__c' },
        { label: 'Date', fieldName: 'CreatedDate', type: 'date'}
    ]
    
    onRestart() {
        this.dispatchEvent(new CustomEvent('restart'));
    }

    connectedCallback() {
        this.saveResult();
    }

    saveResult() {
        const resultObject = {
            Name: this.name,
            Value__c: this.result
        };
        console.log(resultObject);
        if (this.result > 1) {
            saveResult({ result : resultObject })
            .then(() => {
                this.loadResults();
            })
            .catch(error => {
                console.log("error", JSON.stringify(error));
            });
        } else {
            this.loadResults();
        }
    }

    loadResults() {
        getResults()
        .then ((resultList) => {
            this.results = resultList;
            console.log("gameOverPage connectedCallback");
        })
        .catch(error => {
            console.log("error", JSON.stringify(error));
        })
    }
}