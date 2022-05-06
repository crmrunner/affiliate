import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.css']
})
export class DefaultFooterComponent implements OnInit {
  date: any;
  constructor() { }

  ngOnInit(): void {
    this.date=new Date();
  }

}
