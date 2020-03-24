package elision.paymentrequestapi.paymentrequestapi.mapper;

import elision.paymentrequestapi.paymentrequestapi.dto.OrderOutGoingDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Optional;

@Mapper
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    List<OrderOutGoingDto> orderToOrderDto(List<Order> order);

    OrderOutGoingDto orderToOutgoingOrder(Optional<Order> order);
}
