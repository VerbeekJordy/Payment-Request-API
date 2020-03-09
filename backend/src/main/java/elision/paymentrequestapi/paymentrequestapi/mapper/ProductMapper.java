package elision.paymentrequestapi.paymentrequestapi.mapper;

import elision.paymentrequestapi.paymentrequestapi.dto.ProductDto;
import elision.paymentrequestapi.paymentrequestapi.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    ProductDto ProductToProductDto(Product product);
    List<ProductDto> ProductsToProductDtoList(List<Product> products);
}
