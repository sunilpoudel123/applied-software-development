package edu.miu.cs.cs489.qrpay.wallet.controller;

import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;
import edu.miu.cs.cs489.qrpay.wallet.service.WalletService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/{userId}")
    public Wallet getWallet(@PathVariable UUID userId) {
        return walletService.getWalletByUser(userId);
    }

    @PostMapping("/{userId}")
    public Wallet createWallet(@PathVariable UUID userId) {
        return walletService.createWallet(userId);
    }

    @PostMapping("/{userId}/credit")
    public String credit(@PathVariable UUID userId,
                         @RequestParam BigDecimal amount,
                         @RequestParam UUID refId) {
        walletService.credit(userId, amount, refId);
        return "Wallet credited successfully";
    }

    @PostMapping("/{userId}/debit")
    public String debit(@PathVariable UUID userId,
                        @RequestParam BigDecimal amount,
                        @RequestParam UUID refId) {
        walletService.debit(userId, amount, refId);
        return "Wallet debited successfully";
    }

}