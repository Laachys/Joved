import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { serviceService } from 'src/app/core/service.service';
import { ProductI } from 'src/app/core/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss'],
})
export class NewproductComponent {
  files: File[] = [];
  x: number = 0;
  categoryselect: any;
  formData = new FormData();
  lector = new FileReader();
  showalert :boolean = false;
  showalertfailed :boolean = false;

  protected ModelFormu: ProductI = {
    id_user: '',
    name: '',
    price: '',
    description: '',
    address: '',
    category: '',
    active: '1',
  };

  formularioNewProduct = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
    address: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(15)]],
  });

  constructor(private fb: FormBuilder, private api: serviceService, private router: Router) {}

  onSubmit(): void {

    this.files.forEach((files) => {
      this.formData.append('files', files, files.name);
    });

    /* Guardamos el fomurlario */
    this.ModelFormu.id_user = this.api.id_user;
    this.ModelFormu.name = this.formularioNewProduct.controls['name'].value ?? '';
    this.ModelFormu.category = this.categoryselect ?? '';
    this.ModelFormu.address = this.formularioNewProduct.controls['address'].value ?? '';
    this.ModelFormu.description = this.formularioNewProduct.controls['description'].value ?? '';
    this.ModelFormu.price = this.formularioNewProduct.controls['price'].value ?? '';

    this.formData.append('form', JSON.stringify(this.ModelFormu));

    this.api.addProduct(this.formData).subscribe((data) => {
      if(data.response=='Saved'){
        this.showalert = true;
        setTimeout(() => {
          this.showalert = false;
        }, 3000);

        setTimeout(() => {
          this.router.navigate(['home']);
        }, 5000);

      }else{
        this.showalertfailed = true;
        setTimeout(() => {
          this.showalert = false;
        }, 3000);
      }
    });
  }

  onFilesAdded(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onlyNumbers(event: any) {
    const inputChar = event.target as HTMLInputElement;
    const current = event.data;
    if (inputChar.value.length > 0 && !/^\d+$/.test(inputChar.value)) {
      inputChar.value = current.slice(0, -1);
    }
  }

  selectCategory(event: { value: any }) {
    this.categoryselect = event.value;
  }

}
