import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";

type InputIcon = 'fas fa-user' | 'fas fa-envelope' | 'fas fa-lock';

@Component({
  selector: 'agendou-form-input',
  templateUrl: './form-input.component.html',
})
export class FormInputComponent implements OnInit, OnDestroy {
  @Input() inputId!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type = 'text';
  @Input() icon!: InputIcon;
  @Input() required = true;
  @Input() value = '';
  @Input() feedback: string[] | null = null;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  private valueSubject: Subject<string> = new Subject();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.valueSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.valueChange.emit(value);
      });
  }

  onModelChange(value: string) {
    this.valueSubject.next(value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
