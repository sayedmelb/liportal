import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';

@Component({
	selector: 'object-widget',
	templateUrl: 'object-widget.html'
})
export class ObjectWidget extends InputControlWidget{
	private propertiesBehaviour:any={};
	ngOnInit (){
		super.ngOnInit ();
		this.formProperty.schema.fieldsets.forEach ((fieldset) => {
			fieldset.fields.forEach ((propertyId) => {
				this.propertiesBehaviour[propertyId] = this.formProperty.schema.getBehaviour(propertyId);
			})
		})
	}
}
