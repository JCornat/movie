import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'movie-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() public data: { _id: string, title: string, rating: number, year: number, backgroundImage: string };

  constructor() { }

  ngOnInit(): void {
  }

}
