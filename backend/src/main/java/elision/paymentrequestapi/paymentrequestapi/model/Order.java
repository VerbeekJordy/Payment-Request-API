package elision.paymentrequestapi.paymentrequestapi.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    private long id;


    //////////////
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "PRODUCT_ORDERS", joinColumns = {
            @JoinColumn(name = "ORDER_ID")}, inverseJoinColumns = {
            @JoinColumn(name = "PRODUCT_ID")})
    private List<Product> products;
    //////////////


    //////////////
    @ManyToOne(fetch = FetchType.LAZY)
    private User user1;
    //////////////


    public Order() {
    }

    public Order(List<Product> products) {
        this.products = products;
    }

    public long getId() {
        return id;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
