package edu.miu.cs.cs489.controller;

import edu.miu.cs.cs489.domain.Account;
import edu.miu.cs.cs489.service.AccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class ApiController {

    private final AccountService accountService;
    private static final BigDecimal PRIME_THRESHOLD = new BigDecimal("10000.00");

    public ApiController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> allAccounts() {
        return accountService.listAllSortedByBalanceDesc();
    }

    @GetMapping("/prime")
    public List<Account> primeAccounts() {
        return accountService.listPrimeAccounts(PRIME_THRESHOLD);
    }
}