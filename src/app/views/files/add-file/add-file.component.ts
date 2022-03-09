import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilesService } from 'app/shared/services/files.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {

  uploader: FileUploader = new FileUploader({});
  reader: FileReader = new FileReader();
  
  public hasBaseDropZoneOver: boolean = false;
  fileContent: any;

  file: File | null = null

  update: any = false;
  fileOptions = {
    name: ""
  }
  isValid: boolean=true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddFileComponent>,
    private fileService: FilesService
  ) { }

  ngOnInit(): void {
    //  file upladed content
  
    this.reader.onload = (ev: any) => {
      const self = this;
      self.fileContent = ev.target.result;
      console.log(self.fileContent);
    };
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.reader.readAsDataURL(fileItem._file);
        this.fileOptions.name = fileItem._file.name;
    };
  }
  
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // importProducts(fileList: FileList): void {
  //   let file = fileList[0];
  //   console.log("file", file)
  //   let fileReader: FileReader = new FileReader();
  //   const self = this;
  //   fileReader.readAsDataURL(file);
  //   fileReader.onload = () => {
  //     console.log(fileReader.result);
  //     self.fileContent = fileReader.result;
  //     self.fileOptions.name = file.name;
  //   };
  // }

  importProducts(files: FileList | null): void {
    if (files) {
      let file = files.item(0)
      this.file = file
      let fileReader: FileReader = new FileReader();
        const self = this;
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          console.log(fileReader.result);
          self.fileContent = fileReader.result;
          self.fileOptions.name = file.name;
        };
      }
  }

  submit(binary, fileName) {

    const RequestData={
      file: this.file,
      binary: binary,
      fileName: fileName
    }
    console.log("RequestData",RequestData)
      this.dialogRef.close(RequestData);
  }

}
