import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { serviceService } from 'src/app/core/service.service';
import { FavoriteI } from 'src/app/core/favorite.interface';

@Component({
  selector: 'app-products',
  //templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  template: `
    <div onload="onLoad()" class="main-div">
      <div *ngFor="let item of data | paginate : { itemsPerPage: 6, currentPage: p }">

        <mat-card class="mat-card">

          <p class="name">{{ item.name }}</p>

          <mat-card-content>
            <ngb-carousel class="carousel-dark" *ngIf="contieneImg(item.id)">
              <ng-template ngbSlide *ngFor="let img of getImgPorId(item.id)">
                <img *ngIf="item.id == img.name.slice(0, img.name.indexOf('_'))" src="../../../assets/jovedfiles/{{ item.user }}/{{item.id}}/{{ img.name }}" class="img" alt="Random first slide" />
              </ng-template>
            </ngb-carousel>

            <mat-card-title class="price">{{ item.price }} € </mat-card-title>

            <mat-card-subtitle class="subtitulo">{{item.description}}</mat-card-subtitle>
          </mat-card-content>

          <div class="buttons">
            <button mat-stroked-button (click)="infoproduct(p, item.id)" class="view">
              Información
            </button>

            <button mat-fab [ngClass]="{'button-saved': !isFavorite(item.id),'button-saved-saved': isFavorite(item.id) }" class="view text-white " *ngIf="logueado"  (click)="toggleSave(item)" [class.saved]="item.saved" >
              <mat-icon> favorite </mat-icon>
            </button>
          </div>
        </mat-card>
      </div>

      <pagination-controls class="pagination" (pageChange)="p = $event" (click)="change(p)"></pagination-controls>
    </div>
`,
})
export class ProductsComponent {
  data: any[] = [];
  category: string = '';
  jsonImag: any;
  p: number = 1;
  protected ModelFormu: FavoriteI = {
    id_user: '',
    id_product: '',
  };
  logueado: boolean;
  favorites: any;
  res: boolean = false;

  constructor(private api: serviceService,private router: Router, private rutaActiva: ActivatedRoute) {
    this.logueado = this.api.logueado;
    this.category = this.rutaActiva.snapshot.params['category'];
    this.p = this.rutaActiva.snapshot.params['pag'];

    this.api.productosPorCategoria(parseInt(this.category)).subscribe((data) => {
        this.data = JSON.parse(data.products);
        this.jsonImag = JSON.parse(data.files);
        return data;
      });

    this.api.allfavorites(this.api.id_user).subscribe((data) => {
      this.favorites = data;
      this.favorites = this.favorites.map(
        (item: { product: any }) => item.product
      );
      return this.favorites;
    });
  }

  contieneImg(id: string): boolean {
    var bool = false;
    for (const img of this.jsonImag) {
      if (img.name.slice(0, img.name.indexOf('_')) == id) bool = true;
    }
    return bool;
  }

  getImgPorId(id: number): any[] {
    return this.jsonImag.filter((img: { name: string }) =>
      img.name.startsWith(id + '_')
    );
  }

  toggleSave(product: any) {
    product.saved = !product.saved;
    this.ModelFormu.id_product = product.id;
    this.ModelFormu.id_user = this.api.id_user;
    this.api.favoriteProduct(this.ModelFormu).subscribe((data) => {
      if (data == 'false') {
        product.saved = !product.saved;
      }
    });
  }

  isFavorite(id_product: any): boolean {
    this.res = false;
    try {
      this.favorites.forEach((element: any) => {
        if (element == id_product) {
          this.res = true;
        }
      });
    } catch (error) {
      //throw error;
    }
    return this.res;
  }

  infoproduct(pag: any,id_product: any) {
    //CONTINUAMOS POR AQUII
    // console.log('LE DAMOS');
    this.router.navigate(['/product',  id_product]);
  }

  change(pag: any){
    this.router.navigate(['/categories',  this.category , pag]);
  }
}
