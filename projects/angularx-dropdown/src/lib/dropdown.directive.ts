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

  /**
   * @description - Alignment of dropdown
   */
  @Input()
  alignment?: 'left' | 'right' = 'left';

  /**
   * @description - Disable close dropdown when clicked outside
   */
  @Input()
  disableCloseOnClickOutside = false;

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
      this.closeDropdown();
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

    dropdownContainer.style.top = `${dropdownButton.clientHeight + dropdownButton.offsetTop + 5}px`;

    if (this.alignment === 'right') {
      dropdownContainer.style.left = `${dropdownButton.clientWidth + dropdownButton.offsetLeft}px`;
      dropdownContainer.style.transform = 'translateX(-100%)';
    } else {
      dropdownContainer.style.left = `${dropdownButton.offsetLeft}px`;
    }

    const IS_IT_RIGHT_HAND_SIDE = dropdownButton.offsetLeft > (window.innerWidth / 2);

    if (IS_IT_RIGHT_HAND_SIDE) {
      dropdownContainer.style.maxWidth = `${(window.innerWidth - dropdownButton.offsetLeft) - 20}px`;
    } else {
      dropdownContainer.style.maxWidth = `${window.innerWidth - dropdownButton.offsetLeft - dropdownButton.clientWidth - 20}px`;
    }

    this.dropDownContainer = dropdownContainer;

    // Control all the elements with for

    for (const CHILD of Array.from(dropdownContainer.querySelectorAll('*'))) {
      const ATTRIBUTES = Array.from(CHILD.attributes).map(attr => attr.name);
      if (ATTRIBUTES.includes('dropdown-close')) {
        CHILD.addEventListener('click', () => {
          this.closeDropdown();
        });
      }
    }

    this.renderer.appendChild(dropdownButton.parentElement, dropdownContainer);


    // Add eventlistener to close dropdown when clicked outside
    if (!this.disableCloseOnClickOutside) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdownEvent);
      }, 100);
    }
  }

  // Close dropdown when clicked outside
  private closeDropdownEvent = (e: MouseEvent) => {
    if (!this.dropDownContainer?.contains(e.target as Node)) {
      this.closeDropdown();
      document.removeEventListener('click', this.closeDropdownEvent);
    }
  }

  private closeDropdown() {
    this.dropDownContainer?.remove();
    this.dropDownContainer = null;
  }

}
