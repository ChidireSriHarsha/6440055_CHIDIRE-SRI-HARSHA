import java.sql.*;

public class JDBCSelectDemo {
    public static void main(String[] args) {
        try (Connection con = DriverManager.getConnection("jdbc:sqlite:students.db");
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM students")) {
            while (rs.next()) {
                System.out.println(rs.getInt("id") + ": " + rs.getString("name"));
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}