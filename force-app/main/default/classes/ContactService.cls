public class ContactService {
    
    @AuraEnabled()
    public static Contact createContact(Contact cont){
        if(cont == null) return null;
        try {
            insert cont;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return cont;
    }

    @AuraEnabled(cacheable = true)
    public static Contact getContact(String login){
        if(String.isBlank(login)) return null;
        Contact contact = new Contact();
        try {
            contact = ContactManager.getContact(login);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return contact;
    }

}