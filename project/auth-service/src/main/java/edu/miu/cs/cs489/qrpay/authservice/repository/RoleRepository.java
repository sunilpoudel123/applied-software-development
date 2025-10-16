package edu.miu.cs.cs489.qrpay.authservice.repository;

import edu.miu.cs.cs489.qrpay.authservice.domain.Role;
import edu.miu.cs.cs489.qrpay.authservice.domain.RoleName;
import edu.miu.cs.cs489.qrpay.authservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("SELECT r FROM Role r WHERE r.roleName = :roleName")
    Optional<Role> findByRoleName(@Param("roleName") RoleName roleName);
}