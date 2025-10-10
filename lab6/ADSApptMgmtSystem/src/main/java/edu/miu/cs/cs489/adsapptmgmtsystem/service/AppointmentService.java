package edu.miu.cs.cs489.adsapptmgmtsystem.service;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.Appointment;
import edu.miu.cs.cs489.adsapptmgmtsystem.model.Dentist;
import edu.miu.cs.cs489.adsapptmgmtsystem.repository.AppointmentRepository;
import edu.miu.cs.cs489.adsapptmgmtsystem.util.AppointmentStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    // Create
    public Appointment createAppointment(Appointment appointment) {
        log.info("Creating appointment for date: {} at {}",
                appointment.getAppointmentDate(), appointment.getAppointmentTime());
        return appointmentRepository.save(appointment);
    }

    // Read - All
    public List<Appointment> getAllAppointments() {
        log.info("Fetching all appointments");
        return appointmentRepository.findAll();
    }

    // Read - By ID
    public Optional<Appointment> getAppointmentById(Long id) {
        log.info("Fetching appointment with ID: {}", id);
        return appointmentRepository.findById(id);
    }

    // Read - By Patient
    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        log.info("Fetching appointments for patient ID: {}", patientId);
        return appointmentRepository.findByPatientPatientId(patientId);
    }

    // Read - By Dentist
    public List<Appointment> getAppointmentsByDentist(Long dentistId) {
        log.info("Fetching appointments for dentist ID: {}", dentistId);
        return appointmentRepository.findByDentistDentistId(dentistId);
    }

    // Read - By Surgery
    public List<Appointment> getAppointmentsBySurgery(Long surgeryId) {
        log.info("Fetching appointments for surgery ID: {}", surgeryId);
        return appointmentRepository.findBySurgerySurgeryId(surgeryId);
    }

    // Read - By Date
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        log.info("Fetching appointments for date: {}", date);
        return appointmentRepository.findByAppointmentDate(date);
    }

    // Read - By Status
    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        log.info("Fetching appointments with status: {}", status);
        return appointmentRepository.findByStatus(status);
    }

    // Read - By Dentist and Date
    public List<Appointment> getAppointmentsByDentistAndDate(Dentist dentist, LocalDate date) {
        log.info("Fetching appointments for dentist {} on {}", dentist.getLastName(), date);
        return appointmentRepository.findByDentistAndAppointmentDate(dentist, date);
    }

    // Update
    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        log.info("Updating appointment with ID: {}", id);
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    appointment.setAppointmentDate(updatedAppointment.getAppointmentDate());
                    appointment.setAppointmentTime(updatedAppointment.getAppointmentTime());
                    appointment.setStatus(updatedAppointment.getStatus());
                    return appointmentRepository.save(appointment);
                })
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    // Update Status
    public Appointment updateAppointmentStatus(Long id, AppointmentStatus status) {
        log.info("Updating appointment status with ID: {} to {}", id, status);
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    appointment.setStatus(status);
                    return appointmentRepository.save(appointment);
                })
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    // Delete
    public void deleteAppointment(Long id) {
        log.info("Deleting appointment with ID: {}", id);
        appointmentRepository.deleteById(id);
    }

    // Count
    public long countAppointments() {
        return appointmentRepository.count();
    }
}