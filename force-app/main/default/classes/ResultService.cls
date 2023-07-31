public class ResultService {
    
    @AuraEnabled
    public static List<Result__c> getTopResults() {
        try {
            return ResultManager.getTopResults();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveResult(Result__c result){
        try {
            clearResults();
            ResultManager.saveResult(result);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    private static void clearResults() {
        List<Result__c> topResults = getTopResults();
        if (topResults.size() < 10) return;
        
        List<Result__c> recordsForDelete = ResultManager.getByIds(ObjectService.getIdFields(topResults, 'Id'));

        try {
            delete recordsForDelete;
        } catch (Exception e) {
            throw new ResultServiceException(e.getMessage());
        }
    }

    private class ResultServiceException extends Exception {
    }
}
