package edu.miu.cs.cs489.lab2a;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import edu.miu.cs.cs489.lab2a.model.Employee;
import edu.miu.cs.cs489.lab2a.model.PensionPlan;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

public class EmployeePensionPlanApp {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();

        // Populate employees and pension plans
        employees.add(new Employee(1L, "Daniel", "Agar", LocalDate.of(2023, 1, 17), 105_945.50));
        employees.get(0).setPensionPlan(new PensionPlan("EX1089", LocalDate.of(2023, 1, 17), 100.00));

        employees.add(new Employee(2L, "Benard", "Shaw", LocalDate.of(2022, 9, 3), 197_750.00));
        // No pension plan

        employees.add(new Employee(3L, "Carly", "Agar", LocalDate.of(2014, 5, 16), 842_000.75));
        employees.get(2).setPensionPlan(new PensionPlan("SM2307", LocalDate.of(2017, 5, 17), 1555.50));

        employees.add(new Employee(4L, "Wesley", "Schneider", LocalDate.of(2023, 7, 21), 74_500.00));
        // No pension plan

        employees.add(new Employee(5L, "Anna", "Wiltord", LocalDate.of(2023, 3, 15), 85_750.00));
        // No pension plan

        employees.add(new Employee(6L, "Yosef", "Tesfalem", LocalDate.of(2024, 10, 31), 100_000.00));
        // No pension plan

        System.out.println("All Employees (with PensionPlan if exists) in JSON format:");
        printEmployeesJson(employees);

        System.out.println("\nQuarterly Upcoming Enrollees Report in JSON format:");
        printQuarterlyUpcomingEnrolleesJson(employees);
    }

    private static Gson buildGson() {
        return new GsonBuilder()
                .setPrettyPrinting()
                .registerTypeAdapter(LocalDate.class, new TypeAdapter<LocalDate>() {
                    @Override
                    public void write(JsonWriter out, LocalDate value) throws IOException {
                        out.value(value != null ? value.toString() : null);
                    }

                    @Override
                    public LocalDate read(JsonReader in) throws IOException {
                        String s = in.nextString();
                        return s != null ? LocalDate.parse(s) : null;
                    }
                })
                .create();
    }

    // Print all employees in JSON, sorted by yearlySalary desc, lastName asc
    private static void printEmployeesJson(List<Employee> employees) {
        List<Employee> sorted = employees.stream()
                .sorted(Comparator.comparing(Employee::getYearlySalary, Comparator.reverseOrder())
                        .thenComparing(Employee::getLastName))
                .collect(Collectors.toList());
        Gson gson = buildGson();
        System.out.println(gson.toJson(sorted));
    }

    // Print upcoming enrollees for next quarter in JSON, sorted by employmentDate desc
    private static void printQuarterlyUpcomingEnrolleesJson(List<Employee> employees) {
        LocalDate now = LocalDate.now();
        int currentQuarter = (now.getMonthValue() - 1) / 3 + 1;
        int nextQuarter = currentQuarter == 4 ? 1 : currentQuarter + 1;
        int nextQuarterYear = currentQuarter == 4 ? now.getYear() + 1 : now.getYear();
        Month nextQuarterStartMonth = Month.of((nextQuarter - 1) * 3 + 1);
        LocalDate nextQuarterStart = LocalDate.of(nextQuarterYear, nextQuarterStartMonth, 1);
        LocalDate nextQuarterEnd = nextQuarterStart.plusMonths(3).minusDays(1);

        // Employees NOT enrolled for Pension and who will qualify for Pension Plan enrollment
        List<Employee> upcoming = employees.stream()
                .filter(e -> e.getPensionPlan() == null)
                .filter(e -> !e.getEmploymentDate().isAfter(nextQuarterEnd) && !e.getEmploymentDate().isBefore(nextQuarterStart))
                .sorted(Comparator.comparing(Employee::getEmploymentDate, Comparator.reverseOrder()))
                .collect(Collectors.toList());
        Gson gson = buildGson();
        System.out.println(gson.toJson(upcoming));
    }
}
