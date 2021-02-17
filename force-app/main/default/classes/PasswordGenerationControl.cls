public class PasswordGenerationControl {
    
    
    @AuraEnabled
    public static string passwordRandomizer(Integer size_of_password){
        try {
            String Password = '';
             String capitalCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            String lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';        
            String specialCharacters = '!@#$<>*';
            String numbers = '1234567890';
            String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
            String[] totalString = combinedChars.split('');
            
            system.debug(totalString.size());
            
            for(integer i=0;i<16;i++){
                system.debug(totalString[Integer.valueof((Math.random() * (totalString.size()-1)))]);
                Password = Password+totalString[Integer.valueof((Math.random() * (totalString.size()-1)))];
            }
            
            return Password;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}