package edu.miu.cs.cs489appsd.lab1a.productmgmtapp;

import edu.miu.cs.cs489appsd.lab1.productmgmtapp.model.Product;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;

public class ProductMgmtApp {
    public static void main(String[] args) {
        Product[] products = new Product[] {
            new Product(new java.math.BigInteger("31288741190182539912"), "Banana", LocalDate.parse("2025-01-24"), 124, 0.55),
            new Product(new java.math.BigInteger("29274582650152771644"), "Apple", LocalDate.parse("2024-12-09"), 18, 1.09),
            new Product(new java.math.BigInteger("91899274600128155167"), "Carrot", LocalDate.parse("2025-03-31"), 89, 2.99),
            new Product(new java.math.BigInteger("31288741190182539913"), "Banana", LocalDate.parse("2025-02-13"), 240, 0.65)
        };
        printProducts(products);
    }

    public static void printProducts(Product[] products) {
        // Sort by name ascending, then unitPrice descending
        Arrays.sort(products, Comparator.comparing(Product::getName)
                .thenComparing(Comparator.comparing(Product::getUnitPrice).reversed()));

        // Print JSON
        System.out.println("\nJSON Format:");
        System.out.println("[");
        for (int i = 0; i < products.length; i++) {
            Product p = products[i];
            System.out.printf("  {\"productId\":%s, \"name\":\"%s\", \"dateSupplied\":\"%s\", \"quantityInStock\":%d, \"unitPrice\":%.2f}%s\n",
                p.getProductId(), p.getName(), p.getDateSupplied(), p.getQuantityInStock(), p.getUnitPrice(),
                (i < products.length - 1 ? "," : ""));
        }
        System.out.println("]");

        // Print XML
        System.out.println("\nXML Format:");
        System.out.println("<Products>");
        for (Product p : products) {
            System.out.printf("  <Product>\n    <ProductId>%s</ProductId>\n    <Name>%s</Name>\n    <DateSupplied>%s</DateSupplied>\n    <QuantityInStock>%d</QuantityInStock>\n    <UnitPrice>%.2f</UnitPrice>\n  </Product>\n",
                p.getProductId(), p.getName(), p.getDateSupplied(), p.getQuantityInStock(), p.getUnitPrice());
        }
        System.out.println("</Products>");

        // Print CSV
        System.out.println("\nCSV Format:");
        System.out.println("ProductId,Name,DateSupplied,QuantityInStock,UnitPrice");
        for (Product p : products) {
            System.out.printf("%s,%s,%s,%d,%.2f\n",
                p.getProductId(), p.getName(), p.getDateSupplied(), p.getQuantityInStock(), p.getUnitPrice());
        }
    }
}
