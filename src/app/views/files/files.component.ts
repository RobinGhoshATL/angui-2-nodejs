import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { FilesService } from 'app/shared/services/files.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AddFileComponent } from './add-file/add-file.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  animations: egretAnimations
})
export class FilesComponent implements OnInit {

  @ViewChild('search', { static: false }) search: any;


  public items: any[];
  public temp: any[];
  pic: string;
  noProductsText = "Fetching Files...";

  constructor(
    private fileService: FilesService,
    private router: Router,
    private loader: AppLoaderService,
    public dialog: MatDialog,
    private snack: MatSnackBar,

  ) { }

  getFiles(){
    this.loader.open();
    this.fileService.getFiles()
    .subscribe(data => {
      this.items = this.temp= data;
      this.loader.close();
    },
    (error)=>{
      this.loader.close();
      this.noProductsText= "We couldn't find any matches!";
      console.log("Server failed to fulfill a valid request due to missing product version")
    })
  }
  
  ngOnInit(){
    this.getFiles();
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
    console.log(this.temp);
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

  addFile(data: any = {}, isNew?){
    let title = isNew ? 'Add New File' : 'Update File';
    let update = isNew ? false : true;
    
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddFileComponent,{
        width: '720px',
        maxHeight: '99vh',
        disableClose: true,
        data: { title: title, payload: data, update: update}
      })
      dialogRef.afterClosed()
      .subscribe(res => { console.log("file", res)
        if(!res) {
          // If user press cancel
          return;
        }
        if (isNew) {
          this.fileService.addFile(res)
            .subscribe(data => {
              this.getFiles();
              this.snack.open('File Added!', 'OK', { duration: 4000 })
            },
            (err) => {
              this.snack.open('File Not Added!', 'ERROR', { duration: 4000 })
            })
        } 
      });
  }

    onImgError(event) { 
      event.target.src = 'assets/images/default.jpg';
  }

}
