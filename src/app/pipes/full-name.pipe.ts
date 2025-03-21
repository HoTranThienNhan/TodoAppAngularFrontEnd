import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(firstName: string, lastName: string, reverse?: 'reverse'): string {
    if (reverse) {
      return lastName + ' ' + firstName;
    } 
    return firstName + ' ' + lastName;
  }

}
