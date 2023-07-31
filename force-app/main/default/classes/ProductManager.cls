public class ProductManager {
    
    public static List<Product__c> getProducts() {
        return [SELECT Id, Name, Description__c, Price__c, Product_Type__c, Photo_URL__c 
                FROM Product__c];
    }
}