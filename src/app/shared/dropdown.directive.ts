import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding("class.open") isOpened = false;

  @HostListener('document:click', ['$event']) onToggleDropdown(event: Event){
    this.isOpened = this.ElRef.nativeElement.contains(event.target) ? !this.isOpened : false;
  }

  constructor(private ElRef: ElementRef) { }

}
