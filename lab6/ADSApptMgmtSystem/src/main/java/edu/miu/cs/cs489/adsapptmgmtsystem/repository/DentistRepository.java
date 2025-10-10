package edu.miu.cs.cs489.adsapptmgmtsystem.repository;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.Dentist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DentistRepository extends JpaRepository<Dentist, Long> {
    Optional<Dentist> findByEmail(String email);
    List<Dentist> findBySpecialization(String specialization);
    List<Dentist> findByLastName(String lastName);
}