import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';

@Component({
  selector: 'document-widget',
  templateUrl: 'document-widget.html'
})
export class DocumentWidget extends InputControlWidget {

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
