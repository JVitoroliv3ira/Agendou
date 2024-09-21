import {Component} from '@angular/core';

@Component({
  selector: 'agendou-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  public handleInputChangeEvent(input: string, value: string): void {
    console.log(`${input}: ${value}`);
  }
}
