public with sharing class PasswordManagerController {
    
    /*
    
    THis method is called during the component load and fetches all the credentials and sorts it out 
    As per the aplabet (i.e.  in alphabetical order)
    */
    @AuraEnabled(cacheable=true)
    public static List<algo2o__Credential__c> fetch_All_Credentials_Return_Grouped(){
        try {
            return [SELECT Id, Name, CreatedDate, LastModifiedDate, 
            LastActivityDate, LastViewedDate, algo2o__Name_of_App__c, 
            algo2o__Password__c, algo2o__Website_URL__c, algo2o__Is_Salesforce__c,
             algo2o__Username__c, algo2o__Description__c ,algo2o__imageurl__c,algo2o__imageurl68__c
             FROM algo2o__Credential__c ORDER BY algo2o__Name_of_App__c ASC NULLS LAST];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /*
    
    This method is called during the component load and fetches all the credentials and sorts it out 
    As per the aplabet (i.e.  in alphabetical order)
    */
    @AuraEnabled(cacheable=true)
    public static List<algo2o__Credential__c> fetch_All_Credentials_as_Typed(String searchkeyvalue){
        try {
            System.debug([SELECT Id, Name, CreatedDate, LastModifiedDate, LastActivityDate, 
            LastViewedDate, algo2o__Name_of_App__c, algo2o__Password__c, algo2o__Website_URL__c,
             algo2o__Is_Salesforce__c, algo2o__Username__c, algo2o__Description__c,algo2o__imageurl__c,algo2o__imageurl68__c FROM algo2o__Credential__c 
             WHERE algo2o__Name_of_App__c LIKE :'%'+searchkeyvalue+'%' ORDER BY algo2o__Name_of_App__c]);

            return [SELECT Id, Name, CreatedDate, LastModifiedDate, LastActivityDate, LastViewedDate, algo2o__Name_of_App__c, algo2o__Password__c, algo2o__Website_URL__c, algo2o__Is_Salesforce__c, algo2o__Username__c, algo2o__Description__c,algo2o__imageurl__c,algo2o__imageurl68__c FROM algo2o__Credential__c WHERE algo2o__Name_of_App__c LIKE :'%'+searchkeyvalue+'%' ORDER BY algo2o__Name_of_App__c ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }



}
