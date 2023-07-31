public class PsoductSetService {
    
    @AuraEnabled
    public static List<Product_Set__c> getProductSets(){
        try {
            return ProductSetManager.getProductSets();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveProductSets(List<Product_Set__c> productSets){
        try {
            insert productSets;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}