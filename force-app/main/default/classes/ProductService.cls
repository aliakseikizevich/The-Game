public class ProductService {
    
    @AuraEnabled(cacheable = true)
    public static list<Product__c> getProducts(){
        try {
            return ProductManager.getProducts();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}