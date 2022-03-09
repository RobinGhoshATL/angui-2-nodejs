import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public myId;
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.myId = this.activatedRoute.snapshot.params.id 
   }

  ngOnInit(): void {
  }

}
