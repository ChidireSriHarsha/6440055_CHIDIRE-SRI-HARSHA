public class TypeCastingExample {
    public static void main(String[] args) {
        double d = 9.78;
        int i = (int) d;
        int j = 5;
        double dj = j;

        System.out.println("Double to int: " + i);
        System.out.println("Int to double: " + dj);
    }
}