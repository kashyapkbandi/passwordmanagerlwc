import { LightningElement, api, wire } from 'lwc';
import sflogo from '@salesforce/resourceUrl/sflogo';
import { publish, MessageContext } from 'lightning/messageService';
import credSelectedMS from '@salesforce/messageChannel/CredSelected__c';

export default class CredentialVisualmat extends LightningElement {
@api credentialvalue = {};

// To pass scope, you must get a message context.
@wire(MessageContext)
messageContext;
    
    // SFlogo from static resource
    sflogoUrl = sflogo;



    handlecredentialclick(event)
    {
        event.preventDefault();
        console.log("Clicked");
        
        const payload = { messagedata: this.credentialvalue };
        publish(this.messageContext, credSelectedMS, payload);
        console.log("Published");
        
    }

}