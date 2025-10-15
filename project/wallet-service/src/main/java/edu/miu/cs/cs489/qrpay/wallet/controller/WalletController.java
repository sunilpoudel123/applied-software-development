package edu.miu.cs.cs489.qrpay.wallet.controller;

import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;
import edu.miu.cs.cs489.qrpay.wallet.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/wallets")
@Tag(name = "Wallet Management", description = "Endpoints for managing user wallets")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get Wallet", description = "Retrieve wallet details for a user")
    public Wallet getWallet(@PathVariable UUID userId) {
        return walletService.getWalletByUser(userId);
    }

    @PostMapping("/{username}/create")
    @Operation(summary = "Create Wallet", description = "Create a new wallet for a user")
    public Wallet createWallet(@PathVariable String username) {
        return walletService.createWallet(username);
    }

    @PostMapping("/{userId}/credit")
    @Operation(summary = "Credit Wallet", description = "Credit a specified amount to the user's wallet")
    public String credit(@PathVariable UUID userId,
                         @RequestParam BigDecimal amount,
                         @RequestParam UUID refId) {
        walletService.credit(userId, amount, refId);
        return "Wallet credited successfully";
    }

    @PostMapping("/{userId}/debit")
    @Operation(summary = "Debit Wallet", description = "Debit a specified amount from the user's wallet")
    public String debit(@PathVariable UUID userId,
                        @RequestParam BigDecimal amount,
                        @RequestParam UUID refId) {
        walletService.debit(userId, amount, refId);
        return "Wallet debited successfully";
    }

}