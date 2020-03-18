package elision.paymentrequestapi.paymentrequestapi.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {
    @Id
    private String skuId;

    private String titleNl;
    private String titleEn;
    private String price;
    private String imageUrl;

    public Product() {
    }

    public Product(String titleNl, String titleEn, String price, String imageUrl) {
        this.titleNl = titleNl;
        this.titleEn = titleEn;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    public String getSkuId() {
        return skuId;
    }

    public void setSkuId(String skuId) {
        this.skuId = skuId;
    }

    public String getTitleNl() {
        return titleNl;
    }

    public void setTitleNl(String titleNl) {
        this.titleNl = titleNl;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
