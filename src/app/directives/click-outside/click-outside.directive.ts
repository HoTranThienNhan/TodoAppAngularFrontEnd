import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private el: ElementRef) { }

  clickOutsideEventEmitter = output<Event>();

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutsideEventEmitter.emit(event);
    }
  }

}
