import { LightningElement, api } from 'lwc';

export default class PasswordGenerator extends LightningElement {
    @api isvisible;

    isvisible = false;


    closemodal(event){
        this.isvisible=false;
    }
}