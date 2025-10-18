package edu.miu.cs.cs489.qrpay.wallet.util;

import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class WalletTransactionMapper {
    public WalletTransactionResponseDTO toResponseDTO(WalletTransaction transaction) {
        WalletTransactionResponseDTO dto = new WalletTransactionResponseDTO();
        dto.setTransactionId(transaction.getId());
        dto.setUserId(transaction.getUserId());
        dto.setAmount(transaction.getAmount());
        dto.setTransactionType(transaction.getType());
        dto.setTimestamp(transaction.getTimestamp());
        dto.setDescription(transaction.getDescription());
        dto.setTransactionRefId(transaction.getTransactionRefId());
        dto.setWalletId(transaction.getWalletId());
        dto.setStatus(transaction.getStatus());
        return dto;
    }
}
