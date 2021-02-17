# Component details: 


LWC - actionPanel 
Responsible for hosting Add Credentials button, Password generator and Export option buttons.

LWC - credentialexportconfirmation
Just a pop up confirmation.

LWC - credentialVisualmat
Visualmats showing list of credentials on left side

LWC - displayComp
shows the details of the credentials

LWC - deckComp
entire deck holding both list , action panel and display comoponents. 

LWC - listComponent
holds the credentialVisualmat component(s) 

LWC - passwordGenerator
the modal used for selecting password length and creating new credential record. ]

Apex classes: 
ExportCreds - Creates CSV string and sends Email (used in export credentials)
PasswordManagerController - initial fetch of records 
PasswordGenerationControl - very simple random password generator
