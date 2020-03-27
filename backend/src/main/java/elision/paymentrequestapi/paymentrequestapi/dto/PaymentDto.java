package elision.paymentrequestapi.paymentrequestapi.dto;

public class PaymentDto {
    private String paymentMethod;
    private String paymentStatus;

    public PaymentDto() {
    }

    public PaymentDto(String paymentMethod, String paymentStatus) {
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
