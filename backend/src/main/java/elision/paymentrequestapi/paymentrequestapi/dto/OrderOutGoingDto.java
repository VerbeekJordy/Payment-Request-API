package elision.paymentrequestapi.paymentrequestapi.dto;

import elision.paymentrequestapi.paymentrequestapi.model.Product;

import java.util.List;

public class OrderOutGoingDto {
    private List<Product> products;

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
