package edu.miu.cs.cs489.service;

import edu.miu.cs.cs489.domain.Account;
import edu.miu.cs.cs489.domain.Customer;
import edu.miu.cs.cs489.repositories.AccountRepository;
import edu.miu.cs.cs489.repositories.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;

    public AccountService(AccountRepository accountRepository, CustomerRepository customerRepository) {
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
    }

    public List<Account> listAllSortedByBalanceDesc() {
        return accountRepository.findAllByOrderByBalanceDesc();
    }

    public List<Account> listPrimeAccounts(BigDecimal threshold) {
        return accountRepository.findByBalanceGreaterThanOrderByBalanceDesc(threshold);
    }

    public BigDecimal liquidityPosition() {
        return accountRepository.findAll()
                .stream()
                .map(Account::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional
    public Account createCustomerAccount(Customer customer, Account account) {
        customer.setAccount(account);
        customerRepository.save(customer);
        return account;
    }
}
