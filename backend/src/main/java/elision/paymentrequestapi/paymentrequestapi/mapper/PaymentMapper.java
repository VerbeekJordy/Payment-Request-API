package elision.paymentrequestapi.paymentrequestapi.mapper;

import elision.paymentrequestapi.paymentrequestapi.dto.PaymentDto;
import elision.paymentrequestapi.paymentrequestapi.model.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PaymentMapper {
    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    Payment paymentDtoToPayment(PaymentDto paymentDto);

    PaymentDto paymentToPaymentDto(Payment payment);
}
