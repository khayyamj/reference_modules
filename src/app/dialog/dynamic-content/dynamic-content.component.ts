import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, Input} from '@angular/core';
@Component({
selector: 'dynamic-content',
template: `
	<div #container></div>
`,
})
export class DynamicContentComponent {
	currentComponent = null;
	@ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
	@Input() isDialog:boolean;
	constructor(private resolver: ComponentFactoryResolver) {
	}
	@Input() set component(content) {
		if (!content) {
			return;
		}
		// We create a factory out of the component we want to create
		const factory = this.resolver.resolveComponentFactory(content);
		// We create the component using the factory and the injector
		const component = factory.create(this.container.parentInjector);
		// We insert the component into the dom container
		this.container.insert(component.hostView);
		// Destroy the previously created component
		if (this.currentComponent) {
			this.currentComponent.destroy();
		}
		this.currentComponent = component;
	}
}
