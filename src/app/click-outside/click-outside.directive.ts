import {Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, HostListener} from '@angular/core';

const clickOutsideEvents = ['mousedown','touchstart'];
const isDescendant = (el,target) => {
	return target !== null ? el === target || isDescendant( el, target.parentNode ) : false;
};

@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnDestroy {
	public onClickOutsideHandler: EventListener;
	@Output() clickOutside: EventEmitter<any> = new EventEmitter();

	constructor( public el: ElementRef ){
		this.onClickOutsideHandler = this.handleClickOutside.bind( this );
	}

	ngOnInit(){
		clickOutsideEvents.forEach( e => document.addEventListener( e, this.onClickOutsideHandler ) );
	}

	ngOnDestroy() {
		clickOutsideEvents.forEach( e => document.removeEventListener( e, this.onClickOutsideHandler ) );
	}


	handleClickOutside( event ){
		if ( document.documentElement.contains( event.target ) && !isDescendant( this.el.nativeElement, event.target ) ){
			this.clickOutside.emit( event );
		}
	}
}

export default ClickOutsideDirective;
