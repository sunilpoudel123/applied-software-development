package edu.miu.cs.cs489.adsapptmgmtsystem.util;

public enum BillStatus {
    PAID("paid"),
    UNPAID("unpaid");

    private final String value;

    BillStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}