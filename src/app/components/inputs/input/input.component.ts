import { Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  // props
  type = input<string>("text");
  placeholder = input<string>("Placeholder");
  label = input<string | undefined>("");
  required = input<"required" | "optional">("required");
  isError = input<boolean>(false);
  control = input<FormControl>(new FormControl());
}
