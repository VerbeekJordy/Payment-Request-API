package elision.paymentrequestapi.paymentrequestapi.dto;

import java.util.List;

public class OrderInComingDto {
    private List<String> products;
    private PaymentDto paymentDto;

    public OrderInComingDto() {
    }

    public OrderInComingDto(List<String> products) {
        this.products = products;
    }

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    public PaymentDto getPaymentDto() {
        return paymentDto;
    }

    public void setPaymentDto(PaymentDto paymentDto) {
        this.paymentDto = paymentDto;
    }
}
