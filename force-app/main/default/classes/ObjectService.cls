public class ObjectService {
    public static Set<Id> getIdFields(List<SObject> records, String fieldName) {
        Set<Id> result = new Set<Id>();
        for (SObject record : records) {
            result.add((Id)record.get(fieldName));
        }

        return result;
    }
}
