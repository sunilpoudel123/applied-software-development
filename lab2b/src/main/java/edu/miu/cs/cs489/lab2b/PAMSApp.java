package edu.miu.cs.cs489.lab2b;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import edu.miu.cs.cs489.lab2b.model.Patient;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class PAMSApp {
    public static void main(String[] args) {
        Patient[] patients = new Patient[] {
                new Patient("Daniel", "Agar", "(641) 123-0009", "dagar@m.as", "1 N Street", LocalDate.of(1987, 1, 19)),
                new Patient("Ana", "Smith", "", "amsith@te.edu", "", LocalDate.of(1948, 12, 5)),
                new Patient("Marcus", "Garvey", "(123) 292-0018", "", "4 East Ave", LocalDate.of(2001, 9, 18)),
                new Patient("Jeff", "Goldbloom", "(999) 165-1192", "jgold@es.co.za", "", LocalDate.of(1995, 2, 28)),
                new Patient("Mary", "Washington", "", "", "30 W Burlington", LocalDate.of(1932, 5, 31))
        };

        List<Patient> patientDTOs = Arrays.stream(patients)
                .map(o -> (Patient) o)
                .sorted(Comparator.comparingInt((Patient p) -> p.getAge())
                        .reversed())
                .collect(Collectors.toList());

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
                .setPrettyPrinting()
                .create();

        String json = gson.toJson(patientDTOs);

        System.out.println(json);
    }
}
