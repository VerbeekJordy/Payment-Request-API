package elision.paymentrequestapi.paymentrequestapi.mapper;

import elision.paymentrequestapi.paymentrequestapi.dto.ProductDto;
import elision.paymentrequestapi.paymentrequestapi.model.Product;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


public class ProductMapUnitTest {
    @Test
    public void shouldMapToProductDto() {
        Product product = new Product("test", "test1", "100", "test2");

        ProductDto productDto = ProductMapper.INSTANCE.ProductToProductDto(product);

        Assertions.assertNotNull(productDto);
        Assertions.assertEquals(productDto.getTitleNl(), "test");
        Assertions.assertEquals(productDto.getTitleEn(), "test1");
        Assertions.assertEquals(productDto.getPrice(), "100");
        Assertions.assertEquals(productDto.getImageUrl(), "test2");
    }
}
