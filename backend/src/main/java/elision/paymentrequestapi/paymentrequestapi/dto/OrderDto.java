package elision.paymentrequestapi.paymentrequestapi.dto;

import java.util.List;

public class OrderDto {
    private List<String> products;

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    public OrderDto() {
    }

    public OrderDto(List<String> products) {
        this.products = products;
    }
}
