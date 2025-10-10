package edu.miu.cs.cs489.adsapptmgmtsystem.service;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.Surgery;
import edu.miu.cs.cs489.adsapptmgmtsystem.repository.SurgeryRepository;
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
public class SurgeryService {

    private final SurgeryRepository surgeryRepository;

    // Create
    public Surgery createSurgery(Surgery surgery) {
        log.info("Creating surgery: {}", surgery.getName());
        return surgeryRepository.save(surgery);
    }

    // Read - All
    public List<Surgery> getAllSurgeries() {
        log.info("Fetching all surgeries");
        return surgeryRepository.findAll();
    }

    // Read - By ID
    public Optional<Surgery> getSurgeryById(Long id) {
        log.info("Fetching surgery with ID: {}", id);
        return surgeryRepository.findById(id);
    }

    // Read - By Name
    public Optional<Surgery> getSurgeryByName(String name) {
        log.info("Fetching surgery with name: {}", name);
        return surgeryRepository.findByName(name);
    }

    // Update
    public Surgery updateSurgery(Long id, Surgery updatedSurgery) {
        log.info("Updating surgery with ID: {}", id);
        return surgeryRepository.findById(id)
                .map(surgery -> {
                    surgery.setName(updatedSurgery.getName());
                    surgery.setPhone(updatedSurgery.getPhone());
                    surgery.setAddress(updatedSurgery.getAddress());
                    return surgeryRepository.save(surgery);
                })
                .orElseThrow(() -> new RuntimeException("Surgery not found with id: " + id));
    }

    // Delete
    public void deleteSurgery(Long id) {
        log.info("Deleting surgery with ID: {}", id);
        surgeryRepository.deleteById(id);
    }

    // Count
    public long countSurgeries() {
        return surgeryRepository.count();
    }
}