import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class DropdownDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcngtZHJvcGRvd24vc3JjL2xpYi9kcm9wZG93bi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFvRCxNQUFNLGVBQWUsQ0FBQzs7QUFLN0gsTUFBTSxPQUFPLGlCQUFpQjtJQStCNUIsWUFDVSxVQUFzQixFQUN0QixRQUFtQixFQUNuQixPQUF5QjtRQUZ6QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUF2Qm5DOztXQUVHO1FBRUgsU0FBSSxHQUF3QixJQUFJLENBQUM7UUFFakM7O1dBRUc7UUFFSCxjQUFTLEdBQXNCLE1BQU0sQ0FBQztRQUV0Qzs7V0FFRztRQUVILCtCQUEwQixHQUFHLEtBQUssQ0FBQztRQTRHbkMsc0NBQXNDO1FBQzlCLHVCQUFrQixHQUFHLENBQUMsQ0FBYSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQWMsQ0FBQyxFQUFFO2dCQUN2RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDaEU7UUFDSCxDQUFDLENBQUE7SUExR0csQ0FBQztJQUVMLFFBQVE7UUFDTixrQ0FBa0M7UUFDbEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFB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QVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDekMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRzNFLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFO1lBQ3BDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM5RCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDtJQUNILENBQUM7SUFVTyxhQUFhO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7OzhHQWxKVSxpQkFBaUI7a0dBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUg3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO2lCQUN6Qjt3SkFPQyxnQkFBZ0I7c0JBRGYsS0FBSztnQkFJTixTQUFTO3NCQURSLEtBQUs7Z0JBT04sSUFBSTtzQkFESCxLQUFLO2dCQU9OLFNBQVM7c0JBRFIsS0FBSztnQkFPTiwwQkFBMEI7c0JBRHpCLEtBQUs7Z0JBMENpQixPQUFPO3NCQUE3QixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdEcm9wZG93bl0nXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIC0gSXQgbXVzdCBiZSBgbmctdGVtcGxhdGVgIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIGRyb3Bkb3duVGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpXG4gIGNsYXNzTGlzdD86IHN0cmluZ1tdIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gLSBzbTogMjMwcHggKGRlZmF1bHQpIHwgbWQ6IDMwMHB4IHwgbGc6IDQwMHB4XG4gICAqL1xuICBASW5wdXQoKVxuICBzaXplPzogJ3NtJyB8ICdtZCcgfCAnbGcnID0gJ3NtJztcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIC0gQWxpZ25tZW50IG9mIGRyb3Bkb3duXG4gICAqL1xuICBASW5wdXQoKVxuICBhbGlnbm1lbnQ/OiAnbGVmdCcgfCAncmlnaHQnID0gJ2xlZnQnO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gLSBEaXNhYmxlIGNsb3NlIGRyb3Bkb3duIHdoZW4gY2xpY2tlZCBvdXRzaWRlXG4gICAqL1xuICBASW5wdXQoKVxuICBkaXNhYmxlQ2xvc2VPbkNsaWNrT3V0c2lkZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZHJvcERvd25Db250YWluZXIhOiBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBBZGQgY3NzIGNsYXNzZXMgdG8gZ2xvYmFsIHN0eWxlXG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChzdHlsZSwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KGBcbiAgICAgICAgLmFuZ3VsYXJ4LWRyb3Bkb3duIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlY2VjZWM7XG4gICAgICAgICAgYm94LXNoYWRvdzogMHB4IDBweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgei1pbmRleDogMTAwMDAwO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5hbmd1bGFyeC1kcm9wZG93bi1zbSB7XG4gICAgICAgICAgd2lkdGg6IDIzMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmFuZ3VsYXJ4LWRyb3Bkb3duLW1kIHtcbiAgICAgICAgICB3aWR0aDogMzAwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAuYW5ndWxhcngtZHJvcGRvd24tbGcge1xuICAgICAgICAgIHdpZHRoOiA0MDBweDtcbiAgICAgICAgfVxuICAgICAgICBgXG4gICAgKSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHN0eWxlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcblxuICAgIC8vIElmIGRyb3Bkb3duIGlzIGFscmVhZHkgb3BlbiwgY2xvc2UgaXRcbiAgICBpZiAodGhpcy5kcm9wRG93bkNvbnRhaW5lcikge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcGRvd25CdXR0b24gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBkcm9wZG93bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25Db250YWluZXIsIHRoaXMudmlld1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5kcm9wZG93blRlbXBsYXRlKS5yb290Tm9kZXNbMF0pO1xuXG5cbiAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKC4uLltcbiAgICAgICdhbmd1bGFyeC1kcm9wZG93bicsXG4gICAgICBgYW5ndWxhcngtZHJvcGRvd24tJHt0aGlzLnNpemV9YCxcbiAgICBdKTtcblxuICAgIGlmICh0aGlzLmNsYXNzTGlzdCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNsYXNzTGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTGlzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKC4uLnRoaXMuY2xhc3NMaXN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkcm9wZG93bkNvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtkcm9wZG93bkJ1dHRvbi5jbGllbnRIZWlnaHQgKyBkcm9wZG93bkJ1dHRvbi5vZmZzZXRUb3AgKyA1fXB4YDtcblxuICAgIGlmICh0aGlzLmFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgZHJvcGRvd25Db250YWluZXIuc3R5bGUubGVmdCA9IGAke2Ryb3Bkb3duQnV0dG9uLmNsaWVudFdpZHRoICsgZHJvcGRvd25CdXR0b24ub2Zmc2V0TGVmdH1weGA7XG4gICAgICBkcm9wZG93bkNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtMTAwJSknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcm9wZG93bkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7ZHJvcGRvd25CdXR0b24ub2Zmc2V0TGVmdH1weGA7XG4gICAgfVxuXG4gICAgY29uc3QgSVNfSVRfUklHSFRfSEFORF9TSURFID0gZHJvcGRvd25CdXR0b24ub2Zmc2V0TGVmdCA+ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpO1xuXG4gICAgaWYgKElTX0lUX1JJR0hUX0hBTkRfU0lERSkge1xuICAgICAgZHJvcGRvd25Db250YWluZXIuc3R5bGUubWF4V2lkdGggPSBgJHsod2luZG93LmlubmVyV2lkdGggLSBkcm9wZG93bkJ1dHRvbi5vZmZzZXRMZWZ0KSAtIDIwfXB4YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJvcGRvd25Db250YWluZXIuc3R5bGUubWF4V2lkdGggPSBgJHt3aW5kb3cuaW5uZXJXaWR0aCAtIGRyb3Bkb3duQnV0dG9uLm9mZnNldExlZnQgLSBkcm9wZG93bkJ1dHRvbi5jbGllbnRXaWR0aCAtIDIwfXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmRyb3BEb3duQ29udGFpbmVyID0gZHJvcGRvd25Db250YWluZXI7XG5cbiAgICAvLyBDb250cm9sIGFsbCB0aGUgZWxlbWVudHMgd2l0aCBmb3JcblxuICAgIGZvciAoY29uc3QgQ0hJTEQgb2YgQXJyYXkuZnJvbShkcm9wZG93bkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcqJykpKSB7XG4gICAgICBjb25zdCBBVFRSSUJVVEVTID0gQXJyYXkuZnJvbShDSElMRC5hdHRyaWJ1dGVzKS5tYXAoYXR0ciA9PiBhdHRyLm5hbWUpO1xuICAgICAgaWYgKEFUVFJJQlVURVMuaW5jbHVkZXMoJ2Ryb3Bkb3duLWNsb3NlJykpIHtcbiAgICAgICAgQ0hJTEQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25CdXR0b24ucGFyZW50RWxlbWVudCwgZHJvcGRvd25Db250YWluZXIpO1xuXG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lciB0byBjbG9zZSBkcm9wZG93biB3aGVuIGNsaWNrZWQgb3V0c2lkZVxuICAgIGlmICghdGhpcy5kaXNhYmxlQ2xvc2VPbkNsaWNrT3V0c2lkZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZURyb3Bkb3duRXZlbnQpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH1cblxuICAvLyBDbG9zZSBkcm9wZG93biB3aGVuIGNsaWNrZWQgb3V0c2lkZVxuICBwcml2YXRlIGNsb3NlRHJvcGRvd25FdmVudCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmRyb3BEb3duQ29udGFpbmVyPy5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VEcm9wZG93bkV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgdGhpcy5kcm9wRG93bkNvbnRhaW5lcj8ucmVtb3ZlKCk7XG4gICAgdGhpcy5kcm9wRG93bkNvbnRhaW5lciA9IG51bGw7XG4gIH1cblxufVxuIl19