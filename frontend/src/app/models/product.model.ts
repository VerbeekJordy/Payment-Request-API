export class Product {
  titleNl: string;
  titleEn: string;
  price: string;
  imageUrl: string;
  skuId: string;

  constructor(titleNl: string, titleEn: string, price: string, imageUrl: string, skuId: string) {
    this.titleNl = titleNl;
    this.titleEn = titleEn;
    this.price = price;
    this.imageUrl = imageUrl;
    this.skuId = skuId;
  }
}
