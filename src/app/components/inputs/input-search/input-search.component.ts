import { Component, input, InputSignal, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  // props
  placeholder = input<string>("Placeholder");
  iconWidth = input<number>(24);
  control = input<FormControl>(new FormControl());
  buttonSearchClick = output<FormControl>();

  // methods
  onClick(): void {
    this.buttonSearchClick.emit(this.control());
  }
}
