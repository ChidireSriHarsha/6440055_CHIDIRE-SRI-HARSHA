import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter names (type 'end' to finish):");
        String name;
        while (!(name = sc.nextLine()).equalsIgnoreCase("end")) {
            names.add(name);
        }
        System.out.println("Student names: " + names);
    }
}