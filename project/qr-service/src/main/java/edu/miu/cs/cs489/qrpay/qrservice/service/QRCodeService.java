package edu.miu.cs.cs489.qrpay.qrservice.service;

import edu.miu.cs.cs489.qrpay.qrservice.domain.QRCode;
import edu.miu.cs.cs489.qrpay.qrservice.domain.QRStatus;
import edu.miu.cs.cs489.qrpay.qrservice.domain.QRType;

import java.util.UUID;

public interface QRCodeService {
    QRCode generateQRCode(UUID userId, QRType type);
    QRCode getQRCode(String qrCodeValue);
    void updateStatus(UUID qrCodeId, QRStatus status);
}