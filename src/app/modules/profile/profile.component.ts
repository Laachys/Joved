import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { serviceService } from 'src/app/core/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  hide = true;
  hidechangepass = true;
  hidechangepassrepeat = true;
  hideoldpass = true;
  hideclose= true;
  favorites: any;
  jsonImag: any;
  products: any;
  res: boolean = false;
  p1: number = 1;
  p2: number = 1;
  formData = new FormData();
  showalertemail = false;
  showalertpass = false;
  showalertbadpassclose = false;
  showalertclosecount: boolean = false;


  changeemail = this.fb.group({
    email: ['' ,[ Validators.email]],
    passemail : ['', [Validators.required, Validators.minLength(8)]]
  });

  changepassword = this.fb.group({
    newpass: ['', [Validators.required, Validators.minLength(8)]],
    newpassrepeat: ['', [Validators.required, Validators.minLength(8)]],
    oldpass: ['', Validators.required]
  });

  closecount = this.fb.group({
    passclose : ['',[Validators.required, Validators.minLength(8)]]
  });

  category: any;
  productsbyuser: any;
  jsonImagbyuser: any;
  closeResult = '';
  modalreference: any;


constructor( private modalService: NgbModal ,private fb: FormBuilder , private cookieService: CookieService , private rutaActiva: ActivatedRoute , private router: Router, private api: serviceService){

  this.category = this.rutaActiva.snapshot.params['category'];

  this.formData.append( 'id_user' , this.api.id_user);

  //Sacamos primero los productos favoritos
  this.api.allfavorites(this.api.id_user).subscribe((data => {
    this.favorites = data;
    this.favorites = this.favorites.map(
      (item: { product: any }) => item.product
    );
    console.log(this.favorites)
    return this.favorites;

  }))

  this.api.allproducts().subscribe((data => {
    this.products = JSON.parse(data.products);
    this.jsonImag = JSON.parse(data.files);
    console.log(this.products)
    return data;
  }))

  this.api.allproductbyiduser(this.api.id_user).subscribe((data => {
    this.productsbyuser = JSON.parse(data.products);
    this.jsonImagbyuser = JSON.parse(data.files);
    console.log(this.productsbyuser);
    return data;
  }))

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

changeEmail(){
  this.formData.append( 'email' , this.changeemail.controls['email'].value ?? '');
  this.formData.append( 'passemail' , this.changeemail.controls['passemail'].value ?? '');
  this.api.changeemail(this.formData).subscribe((data => {
    if(data.response == "true"){
     this.showalertemail = true;
     setTimeout(() => {
      this.showalertemail = false;
    }, 3000);
    }
  }))
}

changePass(){
  this.formData.append( 'newpass' , this.changepassword.controls['newpass'].value ?? '');
  this.formData.append( 'oldpass' , this.changepassword.controls['oldpass'].value ?? '');
 // this.formData.append( 'id_user' , this.api.id_user);
if(this.changepassword.controls['newpass'].value === this.changepassword.controls['newpassrepeat'].value){
  this.api.changepass(this.formData).subscribe((data => {
   // console.log(data);
    if(data.response == "true"){
      this.cookieService.set('Id_user', '');
    this.api.logueado = false;
    this.showalertpass = true;

    setTimeout(() => {
      this.showalertpass = false;
    }, 3000);

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 5000);
    }
  }))
}
}


closeAcount(content : any){
  this.formData.append( 'passclose' , this.closecount.controls['passclose'].value ?? '');
  // console.log(this.formData.get('passclose'));
  this.api.checkpass(this.formData).subscribe((data=>{
    if(data.response == "true"){
      this.modalreference =this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }else{
      console.log("FALSE");
      this.showalertbadpassclose = true;
      setTimeout(() => {
        this.showalertbadpassclose = false;
      }, 3000);

    }
  }))
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


infoproduct(pag: any,id_product: any) {
  //CONTINUAMOS POR AQUII
  // console.log('LE DAMOS');
  this.router.navigate(['/product', id_product]);
}

close() {
  this.api.closecount(this.formData).subscribe((data => {
    if(data == "true"){
      this.showalertclosecount = true;
      this.modalreference.close();
      setTimeout(() => {
        this.showalertclosecount = false;
      }, 3000);

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    }
  }))
}

}
