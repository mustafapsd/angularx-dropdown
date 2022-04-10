import { ElementRef, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DropdownDirective implements OnInit {
    private elementRef;
    private renderer;
    private viewRef;
    /**
     * @description - It must be `ng-template` element
     */
    dropdownTemplate: TemplateRef<any>;
    classList?: string[] | string;
    /**
     * @description - sm: 230px (default) | md: 300px | lg: 400px
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * @description - Alignment of dropdown
     */
    alignment?: 'left' | 'right';
    /**
     * @description - Disable close dropdown when clicked outside
     */
    disableCloseOnClickOutside: boolean;
    private dropDownContainer;
    constructor(elementRef: ElementRef, renderer: Renderer2, viewRef: ViewContainerRef);
    ngOnInit(): void;
    onClick(): void;
    private closeDropdownEvent;
    private closeDropdown;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DropdownDirective, "[ngDropdown]", never, { "dropdownTemplate": "dropdownTemplate"; "classList": "classList"; "size": "size"; "alignment": "alignment"; "disableCloseOnClickOutside": "disableCloseOnClickOutside"; }, {}, never>;
}
