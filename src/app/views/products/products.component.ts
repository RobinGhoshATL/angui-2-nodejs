import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormControl} from '@angular/forms';
import { ProductsService } from 'app/shared/services/products.service';
import { egretAnimations } from "app/shared/animations/egret-animations";
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: egretAnimations
})
export class ProductsComponent implements OnInit {
  
  @ViewChild('search', { static: false }) search: any;

  // pass selected Product id
  myControl = new FormControl();
  public items: any[];
  public temp: any[];
  pic: string;
  noProductsText = "Fetching Products...";

  constructor(
    private ProductService: ProductsService,
    private router: Router,
    private loader: AppLoaderService,
    public dialog: MatDialog,
    private snack: MatSnackBar,
    private sanitizer: DomSanitizer,
    private confirmService:AppConfirmService,
  ) { }

  getProducts(){
    this.loader.open();
    this.ProductService.getProducts()
    .subscribe(data => {
      this.items = this.temp= data;
      for(var i=0; i<this.items.length; i++){
        this.items[i].small_image = this.getSanitizeUrl(this.items[i].small_image)
      }
      this.loader.close();
    },
    (error)=>{
      this.loader.close();
      this.noProductsText= "We couldn't find any matches!";
      console.log("Server failed to fulfill a valid request due to missing product version")
    })
  }
  
  ngOnInit(){
    this.getProducts();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }

  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    const count = keys.length;
    // assign filtered matches to the active datatable
    //console.log(this.items);
    this.items = this.temp.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }else{
          this.noProductsText= "We couldn't find any matches!";
        }
      }
    });
    //console.log(this.rows);
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  addProduct(data: any = {}, isNew?, isImport?){
    let title = isNew ? 'Add New Product' : 'Update Product';
    let update = isNew ? false : true;
    let bulkImport = false;
    
    if(isImport === true){
      bulkImport = true;
      title = "Import Products";
    }

    let dialogRef: MatDialogRef<any> = this.dialog.open(AddProductComponent,{
        width: '720px',
        maxHeight: '99vh',
        disableClose: true,
        data: { title: title, payload: data, update: update, import: bulkImport }
      })
      dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        if (isNew && bulkImport) {
          this.ProductService.addProducts(res)
            .subscribe(data => {
              this.getProducts();
              this.snack.open('Products Added!', 'OK', { duration: 4000 })
            })
        }else if(isNew && !bulkImport){
          this.ProductService.addProduct(res)
            .subscribe(data => {
              this.getProducts();
              this.snack.open('Product Added!', 'OK', { duration: 4000 })
            })
        }else {
          this.ProductService.updateProduct(res)
            .subscribe(data => {
              this.getProducts();
              this.snack.open('Product Updated!', 'OK', { duration: 4000 })
            })
        }
      });
  }

  deleteProduct(data: any){
    this.confirmService.confirm({message: `Do you want to delete product ?`})
    .subscribe(res => {
      if(res){
        this.ProductService.deleteProduct(data)
          .subscribe(data => {
            this.getProducts();
            this.snack.open('Product Deleted!', 'OK', { duration: 4000 })
          })
      }
    })
  }

    onImgError(event) { 
      event.target.src = 'assets/images/default.jpg';
  }

  public getSanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
}

