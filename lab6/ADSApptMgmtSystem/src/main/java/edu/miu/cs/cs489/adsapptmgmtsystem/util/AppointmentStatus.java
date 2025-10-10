package edu.miu.cs.cs489.adsapptmgmtsystem.util;

public enum AppointmentStatus {
    BOOKED("booked"),
    COMPLETED("completed"),
    CANCELED("canceled");

    private final String value;

    AppointmentStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}