package edu.miu.cs.cs489.qrpay.wallet.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
public class WalletRequestDTO {

    private String walletName;
    private BigDecimal balance;
    private String currency;
    private UUID userId;

    public WalletRequestDTO() {

    }

    public WalletRequestDTO(String walletName, BigDecimal balance, String currency) {
        this.walletName = walletName;
        this.balance = balance;
        this.currency = currency;
    }
}