import {Component, EventEmitter, Input, Output} from '@angular/core';


type ButtonStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

@Component({
  selector: 'agendou-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() styleType: ButtonStyle = 'primary';
  @Input() block: boolean = true;

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit();
    }
  }
}
