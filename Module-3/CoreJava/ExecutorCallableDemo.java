import java.util.concurrent.*;

public class ExecutorCallableDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Callable<String> task = () -> "Result from Callable";
        Future<String> future = executor.submit(task);

        System.out.println("Result: " + future.get());
        executor.shutdown();
    }
}