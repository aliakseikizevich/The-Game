public class ContactManager {

    public static Contact getContact(String login) {
        return [SELECT Id, Login__c, Password__c
                FROM Contact
                WHERE Login__c =: login
                LIMIT 1
        ];
    }

    public static Contact getContact(Id contactId) {
        return [SELECT Id, Login__c, Password__c
                FROM Contact
                WHERE Id =: contactId
                LIMIT 1
        ];
    }
}