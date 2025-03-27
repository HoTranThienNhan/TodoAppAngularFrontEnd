import { Component, input } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-spinner',
  imports: [NzSpinModule, NzIconModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  title = input<string>("");
  isLoading = input<boolean>(true);
}
