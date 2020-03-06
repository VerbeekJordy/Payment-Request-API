package elision.paymentrequestapi.paymentrequestapi.controller;

import elision.paymentrequestapi.paymentrequestapi.model.Product;
import elision.paymentrequestapi.paymentrequestapi.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static elision.paymentrequestapi.paymentrequestapi.util.ControllerUtils.notFound;
import static elision.paymentrequestapi.paymentrequestapi.util.ControllerUtils.ok;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return productService.getProducts()
                .map(ok())
                .orElseGet(notFound());
    }
}
