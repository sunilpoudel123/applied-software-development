package edu.miu.cs.cs489.adsapptmgmtsystem.repository;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.Appointment;
import edu.miu.cs.cs489.adsapptmgmtsystem.model.Dentist;
import edu.miu.cs.cs489.adsapptmgmtsystem.util.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientPatientId(Long patientId);
    List<Appointment> findByDentistDentistId(Long dentistId);
    List<Appointment> findBySurgerySurgeryId(Long surgeryId);
    List<Appointment> findByAppointmentDate(LocalDate date);
    List<Appointment> findByStatus(AppointmentStatus status);
    List<Appointment> findByDentistAndAppointmentDate(Dentist dentist, LocalDate date);
}
