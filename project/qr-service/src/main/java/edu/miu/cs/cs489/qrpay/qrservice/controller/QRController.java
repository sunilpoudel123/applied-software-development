package edu.miu.cs.cs489.qrpay.qrservice.controller;

import edu.miu.cs.cs489.qrpay.qrservice.domain.*;
import edu.miu.cs.cs489.qrpay.qrservice.service.QRCodeService;
import edu.miu.cs.cs489.qrpay.qrservice.service.QRTransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/qr")
public class QRController {

    private final QRCodeService qrCodeService;
    private final QRTransactionService qrTransactionService;

    public QRController(QRCodeService qrCodeService, QRTransactionService qrTransactionService) {
        this.qrCodeService = qrCodeService;
        this.qrTransactionService = qrTransactionService;
    }

    @PostMapping("/generate")
    public QRCode generateQRCode(@RequestParam UUID userId,
                                 @RequestParam QRType type) {
        return qrCodeService.generateQRCode(userId, type);
    }

    @GetMapping("/{qrCodeValue}")
    public QRCode getQRCode(@PathVariable String qrCodeValue) {
        return qrCodeService.getQRCode(qrCodeValue);
    }

    @PostMapping("/{qrCodeId}/status")
    public String updateStatus(@PathVariable UUID qrCodeId,
                               @RequestParam QRStatus status) {
        qrCodeService.updateStatus(qrCodeId, status);
        return "QR Code status updated";
    }

    @PostMapping("/{qrCodeId}/log")
    public String logTransaction(@PathVariable UUID qrCodeId,
                                 @RequestParam UUID userId,
                                 @RequestParam QRAction action,
                                 @RequestParam(required = false) UUID paymentRefId,
                                 @RequestParam(required = false) String remarks) {
        qrTransactionService.logTransaction(qrCodeId, userId, action, paymentRefId, remarks);
        return "Transaction logged successfully";
    }

    @GetMapping("/{qrCodeId}/logs")
    public List<QRTransactionLog> getLogs(@PathVariable UUID qrCodeId) {
        return qrTransactionService.getTransactionsByQRCode(qrCodeId);
    }
}