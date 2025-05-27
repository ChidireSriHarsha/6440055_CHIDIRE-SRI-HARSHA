import java.sql.*;

public class JDBCInsertUpdateDemo {
    public static void insertStudent(String name) throws SQLException {
        try (Connection con = DriverManager.getConnection("jdbc:sqlite:students.db");
             PreparedStatement ps = con.prepareStatement("INSERT INTO students(name) VALUES (?)")) {
            ps.setString(1, name);
            ps.executeUpdate();
        }
    }

    public static void updateStudent(int id, String name) throws SQLException {
        try (Connection con = DriverManager.getConnection("jdbc:sqlite:students.db");
             PreparedStatement ps = con.prepareStatement("UPDATE students SET name = ? WHERE id = ?")) {
            ps.setString(1, name);
            ps.setInt(2, id);
            ps.executeUpdate();
        }
    }

    public static void main(String[] args) throws SQLException {
        insertStudent("Charlie");
        updateStudent(1, "UpdatedName");
    }
}