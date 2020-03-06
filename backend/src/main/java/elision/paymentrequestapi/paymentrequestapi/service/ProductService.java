package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.dto.ProductDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.ProductMapper;
import elision.paymentrequestapi.paymentrequestapi.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<List<ProductDto>> getProducts() {
        return Optional.of(ProductMapper.INSTANCE.ProductsToProductDtoList(productRepository.findAll()));
    }
}
