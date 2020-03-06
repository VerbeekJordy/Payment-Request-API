export class Product {
  id: number;
  titleNl: string;
  titleEn: string;
  price: string;
  imageUrl: string;


  constructor(id: number, titleNl: string, titleEn: string, price: string, imageUrl: string) {
    this.id = id;
    this.titleNl = titleNl;
    this.titleEn = titleEn;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
