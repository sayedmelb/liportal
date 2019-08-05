import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';

@Component({
  selector: 'string-widget',
  templateUrl: 'string-widget.html'
})
export class StringWidgetComponent extends InputControlWidget{
  onBlur (event){
		this.schema.error = null;
		if (this.schema.onBlur){ 
			this.schema.onBlur ();
		}
	}
	onChange (event){
		if (this.schema.onChange) this.schema.onChange ();
	}
}
