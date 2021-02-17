import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import passwordRandomizer from '@salesforce/apex/PasswordGenerationControl.passwordRandomizer';
import exportAllCreds from '@salesforce/apex/ExportCreds.exportAllCreds';

export default class ActionPanel extends LightningElement {

    //  Default
    @track showcomponent = false;
    @track visibilitytoggle = false;
    @track randomizerpassword = '';
    // Initial size of the password generator password is six by default
    // will be changed as the user would select it using combobox
    value = '6';
    boolVisible = false;
    @track buttonLabel = 'Use this and Create new Credential';

    // flag to show/hide credentials export confirmation box 
    @track credentialexportconfvisible = false;

    @api objectApiName = "algo2o__Credential__c";
    fields = ["algo2o__Name_of_App__c", "algo2o__Password__c", "algo2o__Website_URL__c", "algo2o__Is_Salesforce__c",
        "algo2o__Username__c", "algo2o__Description__c","algo2o__Application_Product_Name__c"];

    addnewclickhandle(event) {

        // change the showcomponent to true so that the create form is shown.
        //  some 🤝 

        this.showcomponent = true;

    }

    get options() {
        return [
            { label: '8', value: '8' },
            { label: '12', value: '12' },
            { label: '16', value: '16' },
        ];
    }


    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Credential added successfully !",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);

        // close the modal
        this.showcomponent = false;

    }

    recompvisible(event) {
        event.preventDefault();

        if (this.boolVisible) {
            this.buttonLabel = 'Cancel';
            this.boolVisible = false;
        }
        else {
            this.boolVisible = true;
            this.buttonLabel = 'Use this and Create new Credential';
        }
    }

    passwordgeneratorHandle(event) {
        this.visibilitytoggle = true;
    }

    closemodal(event) {
        console.log('Close modal clicked');
        this.showcomponent = false;
    }
    closePGmodal(event) {
        console.log('PG Close modal clicked');
        this.visibilitytoggle = false;
    }

    handleChange(event) {
        event.preventDefault();
        console.log(this.passwordsize);
        this.value = event.detail.value;
        this.randomizerpassword = this.passwordRandomize(this.value);
        console.log(this.passwordRandomize(this.value));
    }



    // Password randomizer method

    passwordRandomize(size_of_password) {
        try {
            let Password = '';
            let capitalCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
            let specialCharacters = '!@#$<>*';
            let numbers = '1234567890';
            let combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
            var totalString = combinedChars.split('');

            console.log(totalString.length);

            for (let index = 0; index < size_of_password; index++) {
                Password = Password + totalString[Math.ceil(Math.random() * totalString.length - 1)]
            }
            console.log(Password);

            return Password
        }
        catch (err) {
            console.error(err);
        }

    }

    handleClick(event){
        this.credentialexportconfvisible = false;

    }

    credentialexportconfirmation(event) {

        this.credentialexportconfvisible = true;

    }


    exportCredentials(event){
         exportAllCreds()
            .then(result => {
                this.credentialExportStatus = result;

                if (this.credentialExportStatus) {
                    // show toast that its success
                    const evt = new ShowToastEvent({
                        title: "Credentials Exported",
                        message: "Credentials exported successfully to your email address",
                        variant: "success"
                    });
                    this.dispatchEvent(evt);

                    // close confirmation modal
                    this.credentialexportconfvisible = false;

                }
                else {
                    // show toast that its not a success
                    const evt = new ShowToastEvent({
                        title: "Credentials Export failed",
                        message: "Oops! something went wrong, Please reach out to admin",
                        variant: "warning"
                    });
                    this.dispatchEvent(evt);
                }

            })
            .catch(error => {
                this.credentialExportStatus = error;
            });
    }

}