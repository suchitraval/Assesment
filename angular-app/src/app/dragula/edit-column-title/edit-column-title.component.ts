import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-column-title',
  templateUrl: './edit-column-title.component.html',
  styleUrls: ['./edit-column-title.component.scss']
})
export class EditColumnTitleComponent implements OnInit {
  @Input() column;
  @Output() columnEvent = new EventEmitter<any>();

  editingTitle = false;
  editTitleText: string;

  @ViewChild('editTitleField') editTitleField: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }
  enableEditTitle() {
    this.editingTitle = true;
    this.editTitleText = this.column.title;
    setTimeout(() => {
      this.renderer.selectRootElement(this.editTitleField.nativeElement).focus();
    }, 50);
  }
  editTitle() {
    const column = {
      title: this.editTitleText,
      column: this.column.id
    };
    // Update column
    this.columnEvent.emit(column);
    this.clearEditTitle();
  }
  editTitleOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.editTitleText && this.editTitleText.trim() !== '') {
        this.editTitleText = this.editTitleText.replace(/\n$/, '');
        this.editTitle();
      } else {
        this.clearEditTitle();
      }
    } else if (event.keyCode === 27) {
      this.clearEditTitle();
    }
  }
  editTitleOnBlur() {
    if (this.editTitleText && this.editTitleText.trim() !== '') {
      this.editTitleText = this.editTitleText.replace(/\n$/, '');
      this.editTitle();
    }
    this.clearEditTitle();
  }
  clearEditTitle() {
    this.editingTitle = false;
  }
}
