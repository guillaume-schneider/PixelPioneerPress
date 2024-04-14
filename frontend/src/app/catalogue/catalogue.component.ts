import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  @Input() games!: any[];

  constructor() { }

  ngOnInit(): void {
  }
}
