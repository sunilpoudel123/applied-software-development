package edu.miu.cs.cs489.qrpay.qrservice.service;

import edu.miu.cs.cs489.qrpay.qrservice.domain.QRAction;
import edu.miu.cs.cs489.qrpay.qrservice.domain.QRTransactionLog;

import java.util.List;
import java.util.UUID;

public interface QRTransactionService {
    void logTransaction(UUID qrCodeId, UUID userId, QRAction action, UUID paymentRefId, String remarks);
    List<QRTransactionLog> getTransactionsByQRCode(UUID qrCodeId);
}