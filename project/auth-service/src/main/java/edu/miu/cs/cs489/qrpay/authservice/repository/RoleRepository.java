package edu.miu.cs.cs489.qrpay.authservice.repository;

import edu.miu.cs.cs489.qrpay.authservice.domain.Role;
import edu.miu.cs.cs489.qrpay.authservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String role);
}