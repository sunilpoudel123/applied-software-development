package edu.miu.cs.cs489appsd.lab1.productmgmtapp.model;

import java.time.LocalDate;

public class Product {

    private java.math.BigInteger productId;
    private String name;
    private LocalDate dateSupplied;
    private int quantityInStock;
    private double unitPrice;

    public Product() {}

    // Constructor with all fields
    public Product(java.math.BigInteger productId, String name, LocalDate dateSupplied,
                   int quantityInStock, double unitPrice) {
        this.productId = productId;
        this.name = name;
        this.dateSupplied = dateSupplied;
        this.quantityInStock = quantityInStock;
        this.unitPrice = unitPrice;
    }

    // Constructor without dateSupplied
    public Product(java.math.BigInteger productId, String name, int quantityInStock, double unitPrice) {
        this.productId = productId;
        this.name = name;
        this.quantityInStock = quantityInStock;
        this.unitPrice = unitPrice;
    }

    public java.math.BigInteger getProductId() {
        return productId;
    }
    public void setProductId(java.math.BigInteger productId) {
        this.productId = productId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public java.time.LocalDate getDateSupplied() {
        return dateSupplied;
    }
    public void setDateSupplied(LocalDate dateSupplied) {
        this.dateSupplied = dateSupplied;
    }
    public int getQuantityInStock() {
        return quantityInStock;
    }
    public void setQuantityInStock(int quantityInStock) {
        this.quantityInStock = quantityInStock;
    }
    public double getUnitPrice() {
        return unitPrice;
    }
    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
