import { LightningElement, track, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext, publish } from 'lightning/messageService';
import gameConnection from '@salesforce/messageChannel/gameConnection__c';
import { createCells, createEnergy, generateTarget, loadEnergy, move } from 'c/mainPageController';

export default class MainPage extends LightningElement {

    @wire(MessageContext)
    messageContext;

    @track startPage = true;
    @track isGameOver = false;
    @track gamePage = false;
    @track isFounded = false;
    @track cells = [];
    maxSize = 5;
    @track result = 0; 
    @track energy = [];
    @track mode = 'light';
    @track speed = 2000;
    @track playerName;
    @track player = 'player';
    @track target = 'target';
    @track currentPlayerCell = {
        id: 12,
        x: 2,
        y: 2
    };
    @track currentTargetCell = {
        id: 0,
        x: 0,
        y: 0
    };
    @track directions = {
        1: 'left',
        2: 'top',
        3: 'right',
        4: 'bottom'
    }

    constructor() {
        super();
        this.createCells(this.maxSize, this.maxSize);
    }

    createCells(width, height) {
        this.cells = createCells(width, height);
    }

    onGamePage(event) {
        if (!this.playerName) {
            this.playerName = event.detail;
        }
        this.result = 0;
        this.startPage = false;
        this.gamePage = true;
        this.isGameOver = false;
    }

    onStart() {
        this.generateTarget();
        this.result = 0;
        this.speed = 2000;
        const payload = {
            oldId: 0,
            newId: 12,
            player: true,
            target: false
        };
        this.currentPlayerCell.x = 2;
        this.currentPlayerCell.y = 2;
        this.energy = createEnergy();

        this.publishMoveEvent(payload);
    }

    onCreateTarget() {
        this.result++;
        if (this.result % 5 === 0) this.speed = 0.8 * this.speed;
        window.setTimeout(() => { this.generateTarget() }, 1000);
        this.energy = loadEnergy(this.energy);
    }

    async generateTarget() {
        const payload = {
            oldId: this.currentTargetCell.id,
            newId: 0,
            player: false,
            target: true 
        };
        this.currentTargetCell = generateTarget(this.currentPlayerCell, this.cells);
        payload.newId = this.currentTargetCell.id;

        this.isFounded = false;
        const targetMovePromise = speed => {
            return new Promise(resolve => (window.setTimeout(() => resolve(), speed)));
        }

        this.publishMoveEvent(payload);

        while(!this.isFounded && !this.isGameOver) {
            this.targetMove();
            this.energy.pop();

            await targetMovePromise(this.speed);
        }
    }

    onPlayerMove(event) {
        if (this.energy.length === 0) return this.gameOver();
        this.currentPlayerCell = move(event.detail, this.currentPlayerCell, this.maxSize);
        this.currentPlayerCell = this.makeMove(this.player, this.currentPlayerCell);
        if (this.currentPlayerCell.id === this.currentTargetCell.id) this.isFounded = true;
    }

    targetMove() {
        if(this.isGameOver || this.isFounded) return;

        this.currentTargetCell = this.findNextCell(this.currentTargetCell);
        this.currentTargetCell = this.makeMove(this.target, this.currentTargetCell);
        // window.setTimeout(() => { this.targetMove() }, this.speed);
    }

    findNextCell(cell) {
        const directionNumber = Math.floor((Math.random() * 4) + 1);
        const newCell = move(this.directions[directionNumber], cell, this.maxSize);
        if (newCell.x === this.currentPlayerCell.x && newCell.y === this.currentPlayerCell.y) {
            return this.findNextCell(cell);
        } else {
            return newCell;
        }
    }

    makeMove(who, currentCell) {
        const cell = this.cells.find(cell => cell.x === currentCell.x && cell.y === currentCell.y);
        const payload = {
            oldId: currentCell.id,
            newId: cell.id,
            player: false,
            target: false
        };
        if (who === this.player) {
            payload.player = true;
        } else if (who === this.target) {
            payload.target = true;
        }
        currentCell.id = cell.id;
        this.publishMoveEvent(payload);

        return currentCell;
    }

    publishMoveEvent(payload) {
        publish(this.messageContext, gameConnection, payload);
    }

    gameOver() {
        this.startPage = false;
        this.isGameOver = true;
        this.gamePage = false;
    }
}