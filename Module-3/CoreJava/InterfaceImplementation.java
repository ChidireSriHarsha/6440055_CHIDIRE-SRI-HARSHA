// 19
interface Playable {
    void play();
}

class Guitar implements Playable {
    public void play() {
        System.out.println("Playing the Guitar");
    }
}

class Piano implements Playable {
    public void play() {
        System.out.println("Playing the Piano");
    }
}

public class InterfaceImplementation {
    public static void main(String[] args) {
        Playable g = new Guitar();
        Playable p = new Piano();
        g.play();
        p.play();
    }
}