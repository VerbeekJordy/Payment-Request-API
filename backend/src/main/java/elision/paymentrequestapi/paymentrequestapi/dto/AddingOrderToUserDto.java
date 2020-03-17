package elision.paymentrequestapi.paymentrequestapi.dto;

public class AddingOrderToUserDto {
    private String email;
    private OrderDto orderDto;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public OrderDto getOrderDto() {
        return orderDto;
    }

    public void setOrderDto(OrderDto orderDto) {
        this.orderDto = orderDto;
    }
}
