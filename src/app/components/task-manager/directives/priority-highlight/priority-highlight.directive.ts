import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

type Option = { [key: string]: any; value: number; colorClass: string; };

@Directive({
  selector: '[appPriorityHighlight]',
  standalone: true
})
export class PriorityHighlightDirective implements OnInit {

  @Input('appPriorityHighlight') options: Option[] = [];

  optionsMap: { [value: number]: string; } = {};
  classLists: string[] = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }


  ngOnInit(): void {
    this.options.forEach((option: Option) => {
      this.optionsMap[option.value] = option.colorClass;
      this.classLists.push(option.colorClass);
    });
    this.highlightElement();
  }

  @HostListener('change')
  onChange(): void {
    this.highlightElement();
  }

  highlightElement(): void {
    const value = this.elementRef.nativeElement.value;
    for (const className of this.classLists) {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    }
    this.renderer.addClass(this.elementRef.nativeElement, this.optionsMap[value]);
  }

}
