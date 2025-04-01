import { Component, input, InputSignal, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-input-search',
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule, FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  // props
  placeholder = input<string>("Placeholder");
  iconWidth = input<number>(18);
  control = input<FormControl>(new FormControl());
  searchSelect = output<string>();
  cities: { id: number, name: string, disabled?: boolean }[] = [
    { id: 1, name: 'MA, Boston' },
    { id: 2, name: 'FL, Miami' },
    { id: 3, name: 'NY, New York' },
    { id: 4, name: 'CA, Los Angeles' },
    { id: 5, name: 'TX, Dallas' }
  ];
  selectedCity!: { id: number, name: string, disabled?: boolean };
  isCollapsed = input<boolean>(false);

  // methods
  onClick(): void {
    this.searchSelect.emit(this.selectedCity.name);
  }

  customSearchFn(term: string, item: { id: number, name: string, disabled: boolean }) {
    item.name = item.name.replace(',', '');
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }
}
