import { LightningElement, wire } from 'lwc';
import fetch_All_Credentials_Return_Grouped from '@salesforce/apex/PasswordManagerController.fetch_All_Credentials_Return_Grouped';
import fetch_All_Credentials_as_Typed from '@salesforce/apex/PasswordManagerController.fetch_All_Credentials_as_Typed';


export default class ListComponent extends LightningElement {

    @wire(fetch_All_Credentials_Return_Grouped) credentialList;


credentialSearchResult = {data:[]};
searchkey;
error;

currentsize = "Sorted Alphabetically";

handleKeyChange(event) {
    this.searchkey = event.target.value;
}

// handleclick method 
handleClickSearch(event)
{
       // add the result size to the badge
       this.currentsize = "Custom search: "+this.searchkey;
        // console.log('credentialSearchResult before assignment - '+JSON.stringify(this.credentialSearchResult));

        this.credentialSearchResult = this.credentialList;

        // console.log('credentialSearchResult after assignment - '+JSON.stringify(this.credentialSearchResult));
        // console.log('credentialList resetting  - '+JSON.stringify(this.credentialList));
        
        
// Apex call to search data
    fetch_All_Credentials_as_Typed({ searchkeyvalue: this.searchkey })
    .then((result) => {
        // resetting the list
        this.credentialList={data:[]};
        // repopulating with search result data
        this.credentialList.data = result;
        // console.log('result returned from apex and got assigned  -'+JSON.stringify(this.credentialList));

        this.error = undefined;
    })
    .catch((error) => {
        this.error = error;
        this.contacts = undefined;
    });

}

handleClickReset(event)
{
    // setting search key empty string
     this.searchkey = '';
        this.currentsize = "Sorted Alphabetically";

     // setting back all the data to credentialList 
     this.credentialList = this.credentialSearchResult;
}

handleComboChange(event)
{

}

}