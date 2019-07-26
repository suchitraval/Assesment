import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonUtilsService } from '../../core/services/common-utils.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, AfterViewInit {
  @Input() column;
  @Input() scene;

  colHeight: any;

  constructor(
    private commonUtilsService: CommonUtilsService,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
  onCardDrop(columnId: any, dropResult: any) {
    const { removedIndex, addedIndex, payload, droppedElement } = dropResult;
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);
      const newColumn = Object.assign({}, column);
      newColumn.children = this.commonUtilsService.applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);
      this.scene = scene;
    }
  }

  onDragStart(event) {
    // console.log(event);
  }

  onDragEnd(event) {
    // console.log(event);
  }
  getCardPayload(columnId: any) {
    return (index) => {
      return this.scene.children.filter(p => p.id === columnId)[0].children[index];
    };
  }
  log(...params) {
    console.log(...params);
  }
}
