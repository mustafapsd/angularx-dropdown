import * as i0 from '@angular/core';
import { Directive, Input, HostListener, NgModule } from '@angular/core';

class DropdownDirective {
    constructor(elementRef, renderer, viewRef) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.viewRef = viewRef;
        /**
         * @description - sm: 230px (default) | md: 300px | lg: 400px
         */
        this.size = 'sm';
        /**
         * @description - Alignment of dropdown
         */
        this.alignment = 'left';
        /**
         * @description - Disable close dropdown when clicked outside
         */
        this.disableCloseOnClickOutside = false;
        // Close dropdown when clicked outside
        this.closeDropdownEvent = (e) => {
            if (!this.dropDownContainer?.contains(e.target)) {
                this.closeDropdown();
                document.removeEventListener('click', this.closeDropdownEvent);
            }
        };
    }
    ngOnInit() {
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
        `));
        this.renderer.appendChild(document.body, style);
    }
    onClick() {
        // If dropdown is already open, close it
        if (this.dropDownContainer) {
            this.closeDropdown();
            return;
        }
        const dropdownButton = this.elementRef.nativeElement;
        const dropdownContainer = document.createElement('div');
        this.renderer.appendChild(dropdownContainer, this.viewRef.createEmbeddedView(this.dropdownTemplate).rootNodes[0]);
        dropdownContainer.classList.add(...[
            'angularx-dropdown',
            `angularx-dropdown-${this.size}`,
        ]);
        if (this.classList) {
            if (typeof this.classList === 'string') {
                dropdownContainer.classList.add(this.classList);
            }
            else {
                dropdownContainer.classList.add(...this.classList);
            }
        }
        dropdownContainer.style.top = `${dropdownButton.clientHeight + dropdownButton.offsetTop + 5}px`;
        if (this.alignment === 'right') {
            dropdownContainer.style.left = `${dropdownButton.clientWidth + dropdownButton.offsetLeft}px`;
            dropdownContainer.style.transform = 'translateX(-100%)';
        }
        else {
            dropdownContainer.style.left = `${dropdownButton.offsetLeft}px`;
        }
        const IS_IT_RIGHT_HAND_SIDE = dropdownButton.offsetLeft > (window.innerWidth / 2);
        if (IS_IT_RIGHT_HAND_SIDE) {
            dropdownContainer.style.maxWidth = `${(window.innerWidth - dropdownButton.offsetLeft) - 20}px`;
        }
        else {
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
    closeDropdown() {
        this.dropDownContainer?.remove();
        this.dropDownContainer = null;
    }
}
DropdownDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: DropdownDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
DropdownDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.1", type: DropdownDirective, selector: "[ngDropdown]", inputs: { dropdownTemplate: "dropdownTemplate", classList: "classList", size: "size", alignment: "alignment", disableCloseOnClickOutside: "disableCloseOnClickOutside" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: DropdownDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngDropdown]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }]; }, propDecorators: { dropdownTemplate: [{
                type: Input
            }], classList: [{
                type: Input
            }], size: [{
                type: Input
            }], alignment: [{
                type: Input
            }], disableCloseOnClickOutside: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class AngularxDropdownModule {
}
AngularxDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AngularxDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AngularxDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AngularxDropdownModule, declarations: [DropdownDirective], exports: [DropdownDirective] });
AngularxDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AngularxDropdownModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AngularxDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DropdownDirective
                    ],
                    imports: [],
                    exports: [
                        DropdownDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of angularx-dropdown
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularxDropdownModule, DropdownDirective };
//# sourceMappingURL=angularx-dropdown.mjs.map
