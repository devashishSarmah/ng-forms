import { AfterViewInit, Directive, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

type Option = { [key: string]: any; value: number; colorClass: string; };

@Directive({
  selector: '[appPriorityHighlight]',
  standalone: true
})
export class PriorityHighlightDirective implements AfterViewInit {

  @Input('appPriorityHighlight') options: Option[] = [];

  optionsMap: { [value: number]: string; } = {};
  classLists: string[] = [];

  constructor(private renderer: Renderer2, private ngControl: NgControl, @Inject(MAT_FORM_FIELD) private matFormField: MatFormField) {
  }


  ngAfterViewInit(): void {
    this.options.forEach((option: Option) => {
      this.optionsMap[option.value] = option.colorClass;
      this.classLists.push(option.colorClass);
    });
    (this.ngControl.valueAccessor as MatSelect).options.forEach((option: MatOption) => {
      this.renderer.addClass(option._getHostElement(), this.optionsMap[option.value]);
    });
    this.highlightElement();
    this.ngControl.valueChanges?.subscribe(() => {
      this.highlightElement();
    });
  }

  highlightElement(): void {
    const value = this.ngControl.value;
    for (const className of this.classLists) {
      this.renderer.removeClass(this.matFormField._textField.nativeElement, className);
    }
    this.renderer.addClass(this.matFormField._textField.nativeElement, this.optionsMap[value]);
  }

}
