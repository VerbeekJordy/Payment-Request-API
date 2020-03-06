package elision.paymentrequestapi.paymentrequestapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue
    private long id;

    private String title_nl;
    private String title_en;
    private String price;
    private String image_url;

    public long getId() {
        return id;
    }

    public String getTitle_nl() {
        return title_nl;
    }

    public void setTitle_nl(String title_nl) {
        this.title_nl = title_nl;
    }

    public String getTitle_en() {
        return title_en;
    }

    public void setTitle_en(String title_en) {
        this.title_en = title_en;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
