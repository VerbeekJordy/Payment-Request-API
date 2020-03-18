package elision.paymentrequestapi.paymentrequestapi.converter;

import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.model.Product;
import elision.paymentrequestapi.paymentrequestapi.service.ProductService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StringToProductConverter {

    private final ProductService productService;

    public StringToProductConverter(ProductService productService) {
        this.productService = productService;
    }

    public List<Product> stringToProduct(OrderDto orderDto){
        List<Product> products = new ArrayList<>();

        for (String product : orderDto.getProducts()) {
            if (productService.getProductById(product).isPresent()) {
                products.add(productService.getProductById(product).get());
            }
        }
        return products;
    }
}
