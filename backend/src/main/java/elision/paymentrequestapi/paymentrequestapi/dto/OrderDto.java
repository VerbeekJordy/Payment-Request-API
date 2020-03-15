package elision.paymentrequestapi.paymentrequestapi.dto;

import java.util.List;

public class OrderDto {
    private List<ProductDto> products;

    public List<ProductDto> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDto> products) {
        this.products = products;
    }
}
