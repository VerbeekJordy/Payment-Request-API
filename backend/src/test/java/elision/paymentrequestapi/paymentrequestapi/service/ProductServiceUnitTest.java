package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.model.Product;
import elision.paymentrequestapi.paymentrequestapi.repository.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = ProductService.class)
public class ProductServiceUnitTest {

    @MockBean
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Test
    public void getProducts(){
        List<Product> productList = new ArrayList<>();
        productList.add(new Product());
        given(productRepository.findAll()).willReturn(productList);
        Assertions.assertEquals(productService.getProducts().get().size(), 1);
    }

    @Test
    public void getProductById(){
        Product product = new Product();
        given(productRepository.findById(any())).willReturn(Optional.of(product));
        Assertions.assertTrue(productService.getProductById("").isPresent());
    }
}
