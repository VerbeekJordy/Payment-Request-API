package elision.paymentrequestapi.paymentrequestapi.converter;

import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.service.ProductService;
import org.springframework.stereotype.Component;

@Component
public class StringToProductConverter {

    private final ProductService productService;

    public StringToProductConverter(ProductService productService) {
        this.productService = productService;
    }

    public Order stringToProduct(OrderDto orderDto){
        Order order = new Order();
        for (String product : orderDto.getProducts()) {
            if (productService.getProductById(product).isPresent()) {
                order.getProducts().add(productService.getProductById(product).get());
            }
        }
        return order;
    }
}
