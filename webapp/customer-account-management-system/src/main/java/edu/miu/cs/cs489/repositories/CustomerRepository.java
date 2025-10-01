package edu.miu.cs.cs489.repositories;

import edu.miu.cs.cs489.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}