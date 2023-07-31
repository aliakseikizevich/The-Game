public class CartService {
    
    @AuraEnabled
    public static Cart__c createCart(Id clientId){
        if(clientId == null) return null;
        try {
            Cart__c cart = new Cart__c(Client__c = clientId);
            insert cart;
            return cart;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateCart(Cart__c cart){
        if(cart == null) return;
        try {
            update cart;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}