import { Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from "../../error-message/error-message.component";

@Component({
  selector: 'app-input',
  imports: [FormsModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  // props
  type = input<'text' | 'password'>("text");
  placeholder = input<string>("Placeholder");
  label = input<string | undefined>("");
  required = input<"required" | "optional">("optional");
  control = input<FormControl>(new FormControl());
}
