package edu.miu.cs.cs489.adsapptmgmtsystem;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.*;
import edu.miu.cs.cs489.adsapptmgmtsystem.service.AppointmentService;
import edu.miu.cs.cs489.adsapptmgmtsystem.service.DentistService;
import edu.miu.cs.cs489.adsapptmgmtsystem.service.SurgeryService;
import edu.miu.cs.cs489.adsapptmgmtsystem.util.AppointmentStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@SpringBootApplication
public class AdsApptMgmtSystemApplication implements CommandLineRunner {
    private final DentistService dentistService;
    private final AppointmentService appointmentService;
    private final SurgeryService surgeryService;

    public AdsApptMgmtSystemApplication(DentistService dentistService, AppointmentService appointmentService, SurgeryService surgeryService) {
        this.dentistService = dentistService;
        this.appointmentService = appointmentService;
        this.surgeryService = surgeryService;
    }

    public static void main(String[] args) {
        SpringApplication.run(AdsApptMgmtSystemApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        demonstrateCRUDOperations();
    }

    private void demonstrateCRUDOperations() {
        log.info("\n========== DEMONSTRATING CRUD OPERATIONS ==========\n");

        demonstrateReadOperations();

        demonstrateCreateOperations();

        demonstrateUpdateOperations();

        demonstrateDeleteOperations();

        log.info("\n========== CRUD OPERATIONS DEMONSTRATION COMPLETED ==========\n");
    }

    private void demonstrateReadOperations() {
        log.info("\n===== READ OPERATIONS =====");

        log.info("\n--- All Dentists ---");
        List<Dentist> dentists = dentistService.getAllDentists();
        dentists.forEach(d -> log.info("Dr. {} {} - {}", d.getFirstName(), d.getLastName(), d.getSpecialization()));

        log.info("\n--- All Appointments ---");
        List<Appointment> appointments = appointmentService.getAllAppointments();
        appointments.forEach(a -> log.info("Appointment #{} - Date: {} Time: {} - Status: {}",
                a.getAppointmentId(), a.getAppointmentDate(), a.getAppointmentTime(), a.getStatus()));

        log.info("\n--- Booked Appointments ---");
        List<Appointment> bookedAppointments = appointmentService.getAppointmentsByStatus(AppointmentStatus.BOOKED);
        log.info("Total booked appointments: {}", bookedAppointments.size());

        log.info("\n--- Orthodontics Specialists ---");
        List<Dentist> orthodontists = dentistService.getDentistsBySpecialization("Orthodontics");
        orthodontists.forEach(d -> log.info("Dr. {} {}", d.getFirstName(), d.getLastName()));

        log.info("\n--- All Surgeries ---");
        List<Surgery> surgeries = surgeryService.getAllSurgeries();
        surgeries.forEach(s -> log.info("{} - Phone: {}", s.getName(), s.getPhone()));
    }

    private void demonstrateCreateOperations() {
        log.info("\n===== CREATE OPERATIONS =====");

        // Create a new dentist
        log.info("\n--- Creating New Dentist ---");
        Dentist newDentist = new Dentist("Sarah", "Davis", "641-555-1004",
                "sarah.davis@dental.com", "Periodontics");

        Dentist savedDentist = dentistService.createDentist(newDentist);
        log.info("Created: Dr. {} {} (ID: {})", savedDentist.getFirstName(),
                savedDentist.getLastName(), savedDentist.getDentistId());

        // Create a new appointment
        log.info("\n--- Creating New Appointment ---");
        Appointment newAppointment = new Appointment(
                LocalDate.of(2025, 10, 20),
                LocalTime.of(13, 0),
                AppointmentStatus.BOOKED
        );
        newAppointment.setDentist(savedDentist);
        newAppointment.setSurgery(surgeryService.getSurgeryById(1L).get());

        Appointment savedAppointment = appointmentService.createAppointment(newAppointment);
        log.info("Created: Appointment #{} on {} at {}",
                savedAppointment.getAppointmentId(),
                savedAppointment.getAppointmentDate(),
                savedAppointment.getAppointmentTime());
    }

    private void demonstrateUpdateOperations() {
        log.info("\n===== UPDATE OPERATIONS =====");

        // Update a dentist
        log.info("\n--- Updating Dentist ---");
        Dentist dentistToUpdate = dentistService.getDentistById(1L).orElse(null);
        if (dentistToUpdate != null) {
            log.info("Before: Dr. {} {} - Phone: {}",
                    dentistToUpdate.getFirstName(), dentistToUpdate.getLastName(), dentistToUpdate.getPhone());

            dentistToUpdate.setPhone("641-555-9999");
            Dentist updatedDentist = dentistService.updateDentist(1L, dentistToUpdate);

            log.info("After: Dr. {} {} - Phone: {}",
                    updatedDentist.getFirstName(), updatedDentist.getLastName(), updatedDentist.getPhone());
        }

        log.info("\n--- Updating Appointment Status ---");
        Appointment appointmentToUpdate = appointmentService.getAppointmentById(1L).orElse(null);
        if (appointmentToUpdate != null) {
            log.info("Before: Appointment #{} - Status: {}",
                    appointmentToUpdate.getAppointmentId(), appointmentToUpdate.getStatus());

            Appointment updatedAppointment = appointmentService.updateAppointmentStatus(
                    1L, AppointmentStatus.COMPLETED);

            log.info("After: Appointment #{} - Status: {}",
                    updatedAppointment.getAppointmentId(), updatedAppointment.getStatus());
        }
    }

    private void demonstrateDeleteOperations() {
        log.info("\n===== DELETE OPERATIONS =====");
        List<Appointment> allAppointments = appointmentService.getAllAppointments();
        if (!allAppointments.isEmpty()) {
            Long lastAppointmentId = Long.valueOf(allAppointments.get(allAppointments.size() - 1).getAppointmentId());
            log.info("Deleting appointment with ID: {}", lastAppointmentId);
            appointmentService.deleteAppointment(lastAppointmentId);
        }
    }
}
