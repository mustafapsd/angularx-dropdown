import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngDropdown]'
})
export class DropdownDirective implements OnInit {

  /**
   * @description - It must be `ng-template` element
   */
  @Input()
  dropdownTemplate!: TemplateRef<any>;

  @Input()
  classList?: string[] | string;

  /**
   * @description - sm: 230px (default) | md: 300px | lg: 400px
   */
  @Input()
  size?: 'sm' | 'md' | 'lg' = 'sm';

  private dropDownContainer!: HTMLElement | null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    // Add css classes to global style
    const style = this.renderer.createElement('style');
    this.renderer.appendChild(style, this.renderer.createText(`
        .angularx-dropdown {
          background: #fff;
          border: 1px solid #ececec;
          box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          padding: 10px;
          z-index: 100000;
          position: absolute;
        }

        .angularx-dropdown-sm {
          width: 230px;
        }

        .angularx-dropdown-md {
          width: 300px;
        }

        .angularx-dropdown-lg {
          width: 400px;
        }
        `
    ));

    this.renderer.appendChild(document.body, style);
  }

  @HostListener('click') onClick() {

    // If dropdown is already open, close it
    if (this.dropDownContainer) {
      this.dropDownContainer.remove();
      this.dropDownContainer = null;
      return;
    }

    const dropdownButton = this.elementRef.nativeElement as HTMLElement;
    const dropdownContainer = document.createElement('div');
    this.renderer.appendChild(dropdownContainer, this.viewRef.createEmbeddedView(this.dropdownTemplate).rootNodes[0]);


    dropdownContainer.classList.add(...[
      'angularx-dropdown',
      `angularx-dropdown-${this.size}`,
    ]);

    if (this.classList) {
      if (typeof this.classList === 'string') {
        dropdownContainer.classList.add(this.classList);
      } else {
        dropdownContainer.classList.add(...this.classList);
      }
    }

    dropdownContainer.style.top = `${dropdownButton.clientHeight + dropdownButton.offsetTop}px`;

    this.renderer.appendChild(dropdownButton.parentElement, dropdownContainer);

    this.dropDownContainer = dropdownContainer;

    // Add eventlistener to close dropdown when clicked outside
    setTimeout(() => {
      document.addEventListener('click', this.closeDropdown);
    }, 100);
  }

  // Close dropdown when clicked outside
  closeDropdown = (e: MouseEvent) => {
    if (!this.dropDownContainer?.contains(e.target as Node)) {
      this.dropDownContainer?.remove();
      this.dropDownContainer = null;
      document.removeEventListener('click', this.closeDropdown);
    }
  }

}
