import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImgLoader]'
})
export class ImageLoaderDirective implements OnInit {

  @Input('appImgLoader') public enhancedClass: string;
  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2,
  ) {}

  ngOnInit(): void {
    const win = window;
    let doc;
    const img = new Image();

    const bigSrc = (function () {
      doc = win.document;
      const styles = doc.querySelector('style').sheet.cssRules;
      const bgDecl = (function () {
        let bgStyle;
        let i;
        const l = styles.length;
        for (i = l - 1; i >= 0; i--) {
          if (styles[i].selectorText &&
              styles[i].selectorText === `.${this.enhancedClass}`) {

            bgStyle = styles[i].style.backgroundImage;
            break;
          }
        }
        return bgStyle;
      }.bind(this)());
      return bgDecl && bgDecl.match(/(?:\(['|"]?)(.*?)(?:['|"]?\))/)[1];
    }.bind(this)());
    img.onload = () => {
      this.render.addClass(this.element.nativeElement, `${this.enhancedClass}`);
    };
    if (bigSrc) {
      img.src = bigSrc;
    }
  }
}
