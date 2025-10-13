package edu.miu.cs.cs489.qrpay.paymentservice.controller;

import edu.miu.cs.cs489.qrpay.paymentservice.domain.Payment;
import edu.miu.cs.cs489.qrpay.paymentservice.dto.PaymentRequestDto;
import edu.miu.cs.cs489.qrpay.paymentservice.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/initiate")
    public Payment initiatePayment(@RequestBody PaymentRequestDto request) {
        return paymentService.initiatePayment(
                request.payeeUserId(),
                request.payeeUserId(),
                request.amount(),
                request.qrCodeValue()
        );
    }

    @PostMapping("/{paymentRefId}/complete")
    public Payment completePayment(@PathVariable UUID paymentRefId,
                                   @RequestParam boolean success) {
        return paymentService.completePayment(paymentRefId, success);
    }

    @GetMapping("/{paymentRefId}")
    public Payment getPaymentByRef(@PathVariable UUID paymentRefId) {
        return paymentService.getPaymentByRef(paymentRefId);
    }

    @GetMapping("/{paymentRefId}/logs")
    public Object getPaymentLogs(@PathVariable UUID paymentRefId) {
        return paymentService.getPaymentByRef(paymentRefId);
    }
}