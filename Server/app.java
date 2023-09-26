public class Laptop {
    // Properties
    private String brand;
    private String model;
    private double screenSize;
    private int ramSizeGB;
    private boolean isTurnedOn;

    // Constructors
    public Laptop(String brand, String model, double screenSize, int ramSizeGB) {
        this.brand = brand;
        this.model = model;
        this.screenSize = screenSize;
        this.ramSizeGB = ramSizeGB;
        this.isTurnedOn = false; // Initially, the laptop is turned off
    }

    public Laptop(String brand, String model, double screenSize) {
        this(brand, model, screenSize, 4); // Default RAM size is 4GB
    }

    public Laptop(String brand, String model) {
        this(brand, model, 15.6); // Default screen size is 15.6 inches and RAM size is 4GB
    }

    // Methods
    public void turnOn() {
        if (!isTurnedOn) {
            isTurnedOn = true;
            System.out.println(brand + " " + model + " is now turned on.");
        } else {
            System.out.println(brand + " " + model + " is already turned on.");
        }
    }

    public void turnOff() {
        if (isTurnedOn) {
            isTurnedOn = false;
            System.out.println(brand + " " + model + " is now turned off.");
        } else {
            System.out.println(brand + " " + model + " is already turned off.");
        }
    }

    public boolean isTurnedOn() {
        return isTurnedOn;
    }
}

public class Runner {
    public static void main(String[] args) {
        // Create three different Laptop objects using different constructors
        Laptop laptop1 = new Laptop("Dell", "XPS 13", 13.3, 8);
        Laptop laptop2 = new Laptop("HP", "Pavilion", 15.6);
        Laptop laptop3 = new Laptop("Lenovo", "ThinkPad");

        // Turn on the laptops
        laptop1.turnOn();
        laptop2.turnOn();
        laptop3.turnOn();

        // Check if laptops are turned on
        System.out.println("Laptop 1 is turned on: " + laptop1.isTurnedOn());
        System.out.println("Laptop 2 is turned on: " + laptop2.isTurnedOn());
        System.out.println("Laptop 3 is turned on: " + laptop3.isTurnedOn());

        // Turn off laptop 1 and check its status
        laptop1.turnOff();
        System.out.println("Laptop 1 is turned on: " + laptop1.isTurnedOn());
    }
}
