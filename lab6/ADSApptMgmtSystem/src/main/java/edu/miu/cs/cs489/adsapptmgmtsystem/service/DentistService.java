package edu.miu.cs.cs489.adsapptmgmtsystem.service;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.Dentist;
import edu.miu.cs.cs489.adsapptmgmtsystem.repository.DentistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DentistService {

    private final DentistRepository dentistRepository;

    // Create
    public Dentist createDentist(Dentist dentist) {
        log.info("Creating dentist: {} {}", dentist.getFirstName(), dentist.getLastName());
        return dentistRepository.save(dentist);
    }

    // Read - All
    public List<Dentist> getAllDentists() {
        log.info("Fetching all dentists");
        return dentistRepository.findAll();
    }

    // Read - By ID
    public Optional<Dentist> getDentistById(Long id) {
        log.info("Fetching dentist with ID: {}", id);
        return dentistRepository.findById(id);
    }

    // Read - By Email
    public Optional<Dentist> getDentistByEmail(String email) {
        log.info("Fetching dentist with email: {}", email);
        return dentistRepository.findByEmail(email);
    }

    // Read - By Specialization
    public List<Dentist> getDentistsBySpecialization(String specialization) {
        log.info("Fetching dentists with specialization: {}", specialization);
        return dentistRepository.findBySpecialization(specialization);
    }

    // Update
    public Dentist updateDentist(Long id, Dentist updatedDentist) {
        log.info("Updating dentist with ID: {}", id);
        return dentistRepository.findById(id)
                .map(dentist -> {
                    dentist.setFirstName(updatedDentist.getFirstName());
                    dentist.setLastName(updatedDentist.getLastName());
                    dentist.setPhone(updatedDentist.getPhone());
                    dentist.setEmail(updatedDentist.getEmail());
                    dentist.setSpecialization(updatedDentist.getSpecialization());
                    return dentistRepository.save(dentist);
                })
                .orElseThrow(() -> new RuntimeException("Dentist not found with id: " + id));
    }

    // Delete
    public void deleteDentist(Long id) {
        log.info("Deleting dentist with ID: {}", id);
        dentistRepository.deleteById(id);
    }

    // Count
    public long countDentists() {
        return dentistRepository.count();
    }
}