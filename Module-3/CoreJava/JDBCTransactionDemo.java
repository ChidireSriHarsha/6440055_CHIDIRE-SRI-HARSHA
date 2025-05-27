import java.sql.*;

public class JDBCTransactionDemo {
    public static void transferMoney(int fromId, int toId, int amount) throws SQLException {
        try (Connection con = DriverManager.getConnection("jdbc:sqlite:bank.db")) {
            con.setAutoCommit(false);

            try (PreparedStatement debit = con.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE id = ?");
                 PreparedStatement credit = con.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE id = ?")) {

                debit.setInt(1, amount);
                debit.setInt(2, fromId);
                debit.executeUpdate();

                credit.setInt(1, amount);
                credit.setInt(2, toId);
                credit.executeUpdate();

                con.commit();
                System.out.println("Transfer successful.");
            } catch (SQLException e) {
                con.rollback();
                System.out.println("Transfer failed: " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) throws SQLException {
        transferMoney(1, 2, 100);
    }
}