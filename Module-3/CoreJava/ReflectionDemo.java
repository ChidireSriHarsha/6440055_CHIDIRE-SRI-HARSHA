// 39
import java.lang.reflect.*;

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("ReflectionTarget");
        Method[] methods = cls.getDeclaredMethods();
        for (Method method : methods)
            System.out.println("Method: " + method.getName());

        Object obj = cls.getDeclaredConstructor().newInstance();
        Method sayHello = cls.getMethod("sayHello");
        sayHello.invoke(obj);
    }
}

class ReflectionTarget {
    public void sayHello() {
        System.out.println("Hello from Reflection!");
    }
}