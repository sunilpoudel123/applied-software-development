package edu.miu.cs.cs489.adsapptmgmtsystem.repository;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    List<Patient> findByLastName(String lastName);
    List<Patient> findByDateOfBirthBetween(LocalDate start, LocalDate end);
}