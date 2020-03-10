import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[hideOnClick]'
})
export class HideOnClickDirective {

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    @HostListener('click', ['$event']) onClick(event: Event) {
        if(event.target["type"] == "button"){
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        };
    }
}