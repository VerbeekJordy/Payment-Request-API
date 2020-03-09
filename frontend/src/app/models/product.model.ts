export class Product {
  titleNl: string;
  titleEn: string;
  price: string;
  imageUrl: string;


  constructor(titleNl: string, titleEn: string, price: string, imageUrl: string) {
    this.titleNl = titleNl;
    this.titleEn = titleEn;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
