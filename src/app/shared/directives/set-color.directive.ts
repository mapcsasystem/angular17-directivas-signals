import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appSetColor]',
  standalone: true,
})
export class SetColorDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input({ required: true }) set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input({ required: true }) set errors(
    value: ValidationErrors | null | undefined
  ) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    console.log(el);
    this.htmlElement = el;
    this.setStyle();
  }

  ngOnInit(): void {
    console.log('OnInit de la directiva');
  }

  setStyle() {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement!.nativeElement.innerHTML = '';
      return;
    }
    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement!.nativeElement.innerHTML = 'El campo es requerido.';
      return;
    }

    if (errors.includes('minlength')) {
      this.htmlElement!.nativeElement.innerHTML = `El campo no tiene los caracteres suficientes deben de ser ${this._errors['minlength']['requiredLength']}.`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement!.nativeElement.innerHTML =
        'El campo es tiene que ser un correo valido.';
      return;
    }
  }
}
