import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnChanges, OnDestroy {
  // Subject to hold the value
  private $selectedColumn = new BehaviorSubject<any>({});
  private $selectedCardsCnt = new BehaviorSubject<ElementRef>(null);
  private $actionsSubject = new Subscription();

  @Output() cardEvent = new EventEmitter<any>();

  // Setters
  @Input() set selectedColumn(value: any) {
    this.$selectedColumn.next(value);
  }

  // Setters
  @Input() set selectedCardsCnt(value: ElementRef) {
    this.$selectedCardsCnt.next(value);
  }

  board: any;
  column: any;
  cardsCnt: ElementRef;
  addCardText: string;
  addingCard = false;

  @ViewChild('addCardField') addCardField: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.$selectedColumn.subscribe(item => this.column = item);
    this.$selectedCardsCnt.subscribe(item => this.cardsCnt = item);
  }
  ngOnChanges() { }
  ngOnDestroy() {
    this.$selectedColumn.unsubscribe();
    this.$selectedCardsCnt.unsubscribe();
    this.$actionsSubject.unsubscribe();
  }
  enableAddCard() {
    this.addingCard = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.addCardField.nativeElement).focus();
      this.cardListScrollToBottom();
    }, 100);
  }
  cardListScrollToBottom() {
    if (this.cardsCnt) {
      this.cardsCnt['scrollTop'] = Number(this.cardsCnt['scrollHeight']);
    }
  }
  addCard() {
    const newCard = {
      title: this.addCardText,
      order: (this.column.todos.length + 1) * 1000,
      column: this.column.id
    };
    // console.log(newCard);
    // Create a new card
    this.cardEvent.emit(newCard);
    this.clearAddCard();
  }
  addCardOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.cardListScrollToBottom();
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCardText = this.addCardText.replace(/\n$/, '');
        this.addCard();
      } else {
        this.clearAddCard();
      }
    } else if (event.keyCode === 27) {
      this.clearAddCard();
    }
  }
  addCardOnBlur() {
    this.clearAddCard();
  }
  clearAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }
}

