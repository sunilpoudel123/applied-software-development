package edu.miu.cs.cs489.repositories;

import edu.miu.cs.cs489.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAllByOrderByBalanceDesc();
    List<Account> findByBalanceGreaterThanOrderByBalanceDesc(BigDecimal amount);
}