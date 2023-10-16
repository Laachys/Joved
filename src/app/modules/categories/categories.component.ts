import { Component, ViewChild } from '@angular/core';
import { EjemploService } from 'src/app/core/ejemplo.service';


@Component({
  selector: 'app-categories',
  // templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  template: `
  <img src="assets/img-fondo/f1.png" class="f1" >
<img src="assets/img-fondo/f8.png" class="f8" >
<img src="assets/img-fondo/f9.png" class="f9" >
<img src="assets/img-fondo/f12.png" class="f12" >

<app-shared-navbar></app-shared-navbar>
  <div onload="onLoad()" class="main-div"  >

      <div *ngFor="let item of data | paginate: { itemsPerPage: 6, currentPage: p }">

      <mat-card class="mat-card">

<mat-card-title>{{item.name}}</mat-card-title>
<mat-card-content >
<ngb-carousel class="carousel-dark" *ngIf="contieneImg(item.id)">
  <ng-template  ngbSlide  *ngFor="let img of getImgPorId(item.id)" >
        <img  *ngIf="item.id == img.name.slice(0, img.name.indexOf('_'))" src='../../../assets/jovedfiles/{{item.id_user}}/{{item.id}}/{{img.name}}' class="img" alt="Random first slide" />
  </ng-template>

</ngb-carousel>
<p>{{item.description}}</p>
</mat-card-content>

<mat-card-actions class="buttons">


<button mat-button class="view">VER</button>
<button mat-icon-button class="saveproduct" aria-label="Example icon button with a heart icon">
  <mat-icon>favorite</mat-icon>
</button>
</mat-card-actions>
</mat-card>


      </div>

    <pagination-controls class="pagination" (pageChange)="p = $event"></pagination-controls>
  </div>
    `
})
export class CategoriesComponent {

  data :any[] = [];
  lista:string[]=["hola","que","tal","estas"];
  //jsonData: any;

  jsonImag: any;

  p: number = 1;
  collection: any[] = [];

  constructor(private api: EjemploService){

    console.log("ESTOY");
    console.log(this.api.category)



    this.api.productosPorCategoria(this.api.category).subscribe(data => {
      //this.data = data.products;


      console.log(data.products);
      this.data = JSON.parse(data.products);
      this.jsonImag = JSON.parse(data.files);
      console.log(this.jsonImag);
      this.collection = this.data;

      for(const img of this.jsonImag){
        console.log(img.name.slice(0,img.name.indexOf("_")));
      }

      return data;


    })
  }

  contieneImg(id:string): boolean{
    var bool = false;

    for(const img of this.jsonImag){
     if(img.name.slice(0,img.name.indexOf("_")) == id)
      bool = true;
    }


    //const name = this.jsonImag.filter(img: { name: string; });
    //console.log(this.jsonImag.getAll());
    //console.log(this.jsonImag.filter((img: { name: string; }) => img.name.startsWith(id_user + '_')))
  // if(){
  //   return true;
  // }else

  return bool;

  }

  getImgPorId(id: number): any[] {
    return this.jsonImag.filter((img: { name: string; }) => img.name.startsWith(id + '_'));
  }

}
