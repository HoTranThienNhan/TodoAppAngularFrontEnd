import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-checkbox',
  imports: [FormsModule],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss'
})
export class InputCheckboxComponent {
  // props
  checkboxName = input<string>("checkbox-name");
  checkboxId = input<string>('checkbox-id');
  label = input<string>("Label");
  value: boolean = false;
  checboxValueEventEmitter = output<boolean>();

  // methods 
  emitCheckboxValue(val: boolean): void {
    this.checboxValueEventEmitter.emit(val);
  }
}
