public with sharing class ExportCreds {
     

    @AuraEnabled
    public static string exportAllCreds(){
        try {

    string header = 'NAME ,DESCRIPTION,USERNAME, PASSWORD, LOGIN URL, IS SALESFORCE APP\n'; //CSV Header Row
    string contrExcelStr = header ;

    for (algo2o__Credential__c variable : [SELECT algo2o__Name_of_App__c, algo2o__Password__c, algo2o__Website_URL__c,
     algo2o__Is_Salesforce__c, algo2o__Username__c, algo2o__Description__c FROM algo2o__Credential__c]) {

        string recordString = variable.algo2o__Name_of_App__c +','+variable.algo2o__Website_URL__c +','+variable.algo2o__Username__c +','+variable.algo2o__Password__c+','+
        variable.algo2o__Is_Salesforce__c +','+variable.algo2o__Description__c+'\n';
        contrExcelStr = contrExcelStr +recordString;
       
    }
            // Send the CSV as email

        Messaging.EmailFileAttachment csvAttachment = new Messaging.EmailFileAttachment();
        blob csvBlob = Blob.valueOf(contrExcelStr);
        string csvname= 'Credentials.csv';
        csvAttachment.setFileName(csvname);
        csvAttachment.setBody(csvBlob);
        Messaging.SingleEmailMessage email =new Messaging.SingleEmailMessage();

        // get current logged in users email and add it to toAddress
        String[] toAddresses = new list<string> {UserInfo.getUserEmail()};
        String subject ='Credentials Export';
        email.setSubject(subject);
        email.setToAddresses( toAddresses );
        email.setPlainTextBody('Credentials CSV ');
        email.setFileAttachments(new Messaging.EmailFileAttachment[]{csvAttachment});
        Messaging.SendEmailResult [] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});


        return 'Success';

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
