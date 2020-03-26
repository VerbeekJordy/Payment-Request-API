package elision.paymentrequestapi.paymentrequestapi.dto;

import elision.paymentrequestapi.paymentrequestapi.model.Product;

import java.util.List;

public class OrderOutGoingDto {
    private String id;
    private List<Product> products;
    private String createdAt;
    private PaymentDto paymentDto;

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public PaymentDto getPaymentDto() {
        return paymentDto;
    }

    public void setPaymentDto(PaymentDto paymentDto) {
        this.paymentDto = paymentDto;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
