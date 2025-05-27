import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> map = new HashMap<>();
        Scanner sc = new Scanner(System.in);

        map.put(101, "Alice");
        map.put(102, "Bob");

        System.out.print("Enter student ID to search: ");
        int id = sc.nextInt();
        System.out.println("Name: " + map.getOrDefault(id, "Not found"));
    }
}