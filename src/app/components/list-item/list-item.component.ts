import { Component, OnInit, Input } from '@angular/core';
import { ListItem } from './list-item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item: ListItem;
}
