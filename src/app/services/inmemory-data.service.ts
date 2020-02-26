import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable()
export class InmemoryDataService implements InMemoryDbService {

  constructor() { }

    createDb() {
        const gifts = [
          // tslint:disable-next-line:max-line-length
            {description: '1 Macbook', thumbnail: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/3/7/7/6/9200000075306773.jpg', price: '2200', stock: 6, id: 1},
          // tslint:disable-next-line:max-line-length
            {description: '1 HP laptop', thumbnail: 'https://be02.cp-static.com/objects/multimedia/e/e6b/1969259_83224127_laptops-hp-pavilion-x360-14-cd0216nb-4mj56ea.jpg', price: '599', stock: 4, id: 2},
          // tslint:disable-next-line:max-line-length
            {description: 'Laptop + muis', thumbnail: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/2/3/3/4/9200000112994332.jpg', price: '0.01', stock: 16, id: 3},
          // tslint:disable-next-line:max-line-length
            {description: 'Headset', thumbnail: 'https://gamemania-sec.azureedge.net/-/media/Sites/GameMania/Products/Accessories/Headsets/TURTLE-BEACH/Multiplatform-Turtle-Beach-Ear-Force-Recon-50P-Headset/Screenshots/Recon50P03.jpg?v=fnmFC5LSW0S6czP7dVpm+Q&Type=Small', price: '89', stock: 16, id: 4},
          // tslint:disable-next-line:max-line-length
            {description: 'Desktop', thumbnail: 'https://www.lenovo.com/medias/lenovo-desktop-v530s-tower-hero.png?context=bWFzdGVyfHJvb3R8MTg3Mzk5fGltYWdlL3BuZ3xoY2UvaDNlLzEwNjI4MjkwNDEyNTc0LnBuZ3w3OGZkODhlMTI1ODFlZGI1OTQzMmMzZWFkY2QzMWJlYjVmZmE3ZTFjZmY5YTM0YTBmNzhkZGE0NWRmMjkxNDRh', price: '499', stock: 10, id: 5},
          // tslint:disable-next-line:max-line-length
            {description: 'Monitor', thumbnail: 'https://cdn.reshift.nl/media/media/thumbnails/640/20160908155129606824949579042/c3583fq-bs_front_to_right_72dpi_rgb.jpg', price: '110', stock: 2, id: 6}
        ];

        return { gifts };
    }
}
