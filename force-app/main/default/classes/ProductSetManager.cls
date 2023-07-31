public class ProductSetManager {
    
    public static List<Product_Set__c> getProductSets() {
        return [SELECT Id, Product__c, Count__c, Cart__c
                FROM Product_Set__c];
    }
}