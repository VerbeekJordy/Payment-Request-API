package elision.paymentrequestapi.paymentrequestapi.dto;

public class AddingOrderToUserDto {
    private String email;
    private OrderInComingDto orderInComingDto;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public OrderInComingDto getOrderInComingDto() {
        return orderInComingDto;
    }

    public void setOrderInComingDto(OrderInComingDto orderInComingDto) {
        this.orderInComingDto = orderInComingDto;
    }
}
