import { LightningElement, wire, track } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import credSelectedMS from '@salesforce/messageChannel/CredSelected__c';
import { getRecord, getRecordNotifyChange } from 'lightning/uiRecordApi';




export default class DisplayComp extends LightningElement {
    @track passedmessage;
    showcomponent = false;

    result = {};

    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                credSelectedMS,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        this.passedmessage = message.messagedata;
        console.log(JSON.parse(JSON.stringify(this.passedmessage)));

        this.result = JSON.parse(JSON.stringify(this.passedmessage));

    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        console.log('Connected Callback - Subscribing...');
        this.subscribeToMessageChannel();
    }


    // Copy links logic
        copyusernamehandler(event) {

        console.log("this is something we are testing"+JSON.stringify(this.template.querySelector('.usernamecopy')));
    }


    updateRecord(event) {
        this.showcomponent = true;

    }
    closemodal(event) {
        this.showcomponent = false;

    }

    // handle submit for record edit form
    handleSubmit(event) {

        this.template.querySelector('lightning-record-edit-form').submit();

        this.showcomponent = false;
        console.log('Done updating');


        eval(
            "$A.get('e.force:refreshView').fire();"
        );
        // Refresh  Detail Page
        getRecordNotifyChange({recordId: this.result.Id});
    }
    handleSucess(event) {
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
    }
}