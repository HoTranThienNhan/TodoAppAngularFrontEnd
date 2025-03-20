import { Component, input } from '@angular/core';

interface ButtonType {
  "Default": "#202327",
  "Cancel": "#66707A",
  "Ok": "#F2AB53"
}

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  // props
  buttonType = input<"Default" | "Cancel" | "Ok">("Default");
}
