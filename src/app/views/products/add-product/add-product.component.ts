import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from 'app/shared/services/products.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: []
})
export class AddProductComponent implements OnInit {
  public itemForm: FormGroup;
  public uploadImage ;
  base64Image;
  productId;
  imageName;

  uploader: FileUploader = new FileUploader({});
  reader: FileReader = new FileReader();
  
  public hasBaseDropZoneOver: boolean = false;
  fileContent: any;

  update: any = false;
  fileOptions = {
    name: ""
  }
  isValid: boolean=true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private fb: FormBuilder,
    private ProductService: ProductsService,
  ) { }

  ngOnInit(): void { 
    this.data.update ? this.buildUpdateForm(this.data.payload): this.buildInsertForm();
    if(this.data.update){
    this.productId = this.data.payload['id'];
    this.getProduct(this.productId);
    }
    //  file upladed content
    this.reader.onload = (ev: any) => {
      const self = this;
      self.fileContent = ev.target.result;
    };
    this.uploader.onAfterAddingFile = (fileItem: any) => {
        this.reader.readAsText(fileItem._file);
        this.fileOptions.name = fileItem._file.name;
    };
  }
  buildInsertForm() {
    this.itemForm = this.fb.group({
      _id: [''],
      epid: [''],
      product_id: [''],
      bottler_id: [''],

      customer_id: [''],
      store_id: [''],
      name: ['', Validators.required],
      retail_price: ['', [Validators.required]],
      sale_price: ['', [Validators.required]],

      skuid: ['', Validators.required],
      description: ['', Validators.required],
      small_image: ['',Validators.required],
      ReturnCode: [''],
      active: [''],

      availability: [''],
      created_at: [''],
      color: [''],
      picture: [''],

      contract: [''],
      store: [''],
      promotion: [''],
      size: [''],
      configuration: [''],
    })
  }

  buildUpdateForm(item) {
    this.itemForm = this.fb.group({
      id: ['' || item.id],
      _id: ['' || item._id],
      epid: ['' || item.epid],
      product_id: ['' || item.product_id],
      bottler_id: ['' || item.bottler_id],

      customer_id: ['' || item.customer_id],
      store_id: ['' || item.store_id],
      name: ['' || item.name],
      retail_price: ['' || item.retail_price],
      sale_price: ['' || item.sale_price],

      skuid: ['' || item.skuid],
      description: ['' || item.description],
      small_image: ['' || item.small_image.changingThisBreaksApplicationSecurity],
      ReturnCode: [1 || item.ReturnCode],
      active: ['' || item.active],

      availability: ['' || item.availability],
      created_at: ['' || item.created_at],
      color: ['' || item.color],
      picture: ['' || item.picture],

      contract: ['' || item.contract],
      store: ['' || item.store],
      promotion: ['' || item.promotion],
      size: ['' || item.size],
      configuration: ['' || item.configuration],
    })
  }

  getProduct(productId){
    this.ProductService.getProduct(productId)
      .subscribe(result => {
      })
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  importProducts(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      self.fileOptions.name = file.name;
    }
    fileReader.readAsText(file);
  }

  submit() {
    let stringVar = this.itemForm.value;
    //stringVar.file = this.uploadImage;
    this.dialogRef.close(stringVar);
  }

  import(productsJson) {
    if(productsJson === undefined){
      this.isValid = false;
    }else{
      let myObject = { 
          data: productsJson
        }
      this.dialogRef.close(myObject);
    } 
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
         var reader = new FileReader();
        //this.dealerlogoImageProfile = file;
        reader.readAsDataURL(event.target.files[0]);
         reader.onload = (event) => { // called once readAsDataURL is completed
        this.uploadImage = event.target.result;
        //this.base64Image = this.uploadImage;
      }
        this.itemForm.get('small_image').setValue(file);
    }
  }
 
}
