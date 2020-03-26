package elision.paymentrequestapi.paymentrequestapi.converter;

import elision.paymentrequestapi.paymentrequestapi.dto.OrderOutGoingDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.PaymentMapper;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.Product;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderToOrderOutgoingDtoConverter {
    public OrderOutGoingDto orderToOrderOutgoingDto(Order order){
        if ( order == null ) {
            return null;
        }

        OrderOutGoingDto orderOutGoingDto = new OrderOutGoingDto();

        List<Product> list = order.getProducts();
        if ( list != null ) {
            orderOutGoingDto.setProducts( new ArrayList<Product>( list ) );
        }
        orderOutGoingDto.setCreatedAt( order.getCreatedAt() );
        orderOutGoingDto.setId( String.valueOf( order.getId() ) );
        orderOutGoingDto.setPaymentDto(PaymentMapper.INSTANCE.paymentToPaymentDto(order.getPayment()));
        return orderOutGoingDto;
    }
}
