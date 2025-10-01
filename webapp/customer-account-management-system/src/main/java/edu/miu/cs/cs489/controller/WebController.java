package edu.miu.cs.cs489.controller;


import edu.miu.cs.cs489.domain.Account;
import edu.miu.cs.cs489.domain.Customer;
import edu.miu.cs.cs489.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Controller
public class WebController {

    private final AccountService accountService;

    public WebController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/accounts")
    public String listAccounts(Model model) {
        List<Account> accounts = accountService.listAllSortedByBalanceDesc();
        BigDecimal liquidity = accountService.liquidityPosition();
        model.addAttribute("accounts", accounts);
        model.addAttribute("liquidity", liquidity);
        return "accounts";
    }

    @GetMapping("/accounts/new")
    public String createForm(Model model) {
        model.addAttribute("customer", new Customer());
        model.addAttribute("account", new Account());
        return "account_form";
    }

    @PostMapping("/accounts")
    public String createAccount(@Valid @ModelAttribute Customer customer,
                                BindingResult custResult,
                                @Valid @ModelAttribute Account account,
                                BindingResult accResult,
                                Model model) {
        if (custResult.hasErrors() || accResult.hasErrors()) {
            return "account_form";
        }
        if (account.getDateOpened() == null) {
            account.setDateOpened(LocalDate.now());
        }
        accountService.createCustomerAccount(customer, account);
        return "redirect:/accounts";
    }
}
