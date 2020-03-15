package elision.paymentrequestapi.paymentrequestapi.mapper;

import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    Order OrderDtoToOrder(OrderDto orderDto);
}
