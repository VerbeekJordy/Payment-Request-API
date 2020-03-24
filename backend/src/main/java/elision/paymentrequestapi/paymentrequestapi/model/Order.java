package elision.paymentrequestapi.paymentrequestapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(generator = "sequence-generator")
    @GenericGenerator(
            name = "sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "order_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "10000"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            })
    private long id;

    private String createdAt;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinTable(name = "PRODUCT_ORDERS", joinColumns = {
            @JoinColumn(name = "ORDER_ID")}, inverseJoinColumns = {
            @JoinColumn(name = "PRODUCT_ID")})
    private List<Product> products = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User users;

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

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
