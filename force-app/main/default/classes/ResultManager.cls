public without sharing class ResultManager {

    public static List<Result__c> getTopResults() {
        return [
            SELECT Id, Name, Value__c, CreatedDate 
            FROM Result__c 
            ORDER BY Value__c 
            DESC 
            LIMIT 10
        ];
    }

    public static void saveResult(Result__c result) {
        insert result;
    }

    public static List<Result__c> getByIds(Set<Id> resultIds) {
        return [
            SELECT Id, Name, Value__c, CreatedDate 
            FROM Result__c 
            WHERE Id 
            IN : resultIds
        ];
    }
}
