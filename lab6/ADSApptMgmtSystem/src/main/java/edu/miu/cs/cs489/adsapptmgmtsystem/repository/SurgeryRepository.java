package edu.miu.cs.cs489.adsapptmgmtsystem.repository;

import edu.miu.cs.cs489.adsapptmgmtsystem.model.Surgery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SurgeryRepository extends JpaRepository<Surgery, Long> {
    Optional<Surgery> findByName(String name);
}