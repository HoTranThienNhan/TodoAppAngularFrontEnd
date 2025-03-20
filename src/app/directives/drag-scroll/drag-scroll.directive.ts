import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragScroll]'
})
export class DragScrollDirective {

  constructor(private el: ElementRef) { }

  // props
  mouseDown: boolean = false;
  startX: number = 0;
  scrollLeft: number = 0;

  @HostListener('mousedown', ['$event'])
  startDragging(e: any) {
    const el = this.el.nativeElement;
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  stopDragging(e: any) {
    const el = this.el.nativeElement;
    this.mouseDown = false;
    el.style.cursor = 'grab';
  }
  
  @HostListener('mousemove', ['$event'])
  moveEvent(e: any) {
    const el = this.el.nativeElement;
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
    el.style.cursor = 'grabbing';
  }
}
