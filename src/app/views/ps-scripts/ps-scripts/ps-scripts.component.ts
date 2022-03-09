import { Component, OnInit } from "@angular/core";
import { SignalRService } from "../services/signal-r.service";
import { HttpClient } from "@angular/common/http";
import { PsScriptService } from "../services/ps-script.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-ps-scripts",
  templateUrl: "./ps-scripts.component.html",
  styleUrls: ["./ps-scripts.component.scss"],
})
export class PsScriptsComponent implements OnInit {
  percentage;
  value;
  response_success;
  reponse = "";
  isPath = true;
  itemForm: FormGroup;

  constructor(
    public signalRService: SignalRService,
    private http: HttpClient,
    private psSer: PsScriptService,
    private fb:FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.formBuilder();
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on("PSScriptResponse", (data) => {
      console.log("data",data)
      this.value = data.percent;
      this.percentage = data.message;
    });

   
  }
  startHttpRequest(path) {
    this.psSer.runScript(path).subscribe((res) => {
      this.reponse = res.response;
      this.isPath = true;
      this.response_success = res.success;
      console.log("response", res.response);
    
      if (res.response[0].message != null) {
        console.log(res.response[0].message)
        this.snackBar.open(res.response[0].message, "OK", { duration: 4000 });
        this.isPath = false;
      }
    });
  }

  formBuilder(){
    this.itemForm = this.fb.group(
      {
        path:['',Validators.required]
      }
    )
  }

  searchPath(){
    
    var path = this.itemForm.get('path').value;
  if( document.getElementById("clear").innerHTML != null){
     // document.getElementById("clear").innerHTML = "";
  }
 
    this.startHttpRequest(path);

  }

  clear(){
    this.itemForm.get('path').reset();
    if( document.getElementById("clear").innerHTML != null){
      document.getElementById("clear").innerHTML = "";
  }
 
  }

  stop() {
    this.signalRService.stopConnection();
  }

  getIsSuccessIcon(success) {
    return success === true ? "done" : "close";
  }
}
