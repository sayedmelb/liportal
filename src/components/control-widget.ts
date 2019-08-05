import { ControlWidget } from "angular2-schema-form";
import { AppConstants } from '../providers/avp.enum';

export class InputControlWidget extends ControlWidget{
	public behaviour:any;
	public parent:any;
	public error;
	public keys:string[]=[];
	private endpoint:string;
	public cardinality:any;
	
	ngOnInit (){
		// Setting endpoint
		this.endpoint = AppConstants.API_ENDPOINT;
		
		// Populating keys
		if (this.schema._key)
			this.keys.push (this.schema._key);
		
		// Setting parent
		if (this.formProperty.parent)
			this.parent = this.formProperty.parent.schema;

		// Setting cardinality
		if (this.parent && this.parent.getCardinality){
			this.cardinality = this.parent.getCardinality (this.keys.join ("."));
		}
		// Setting behaviour
		if (this.parent && this.parent.getBehaviour)
			this.behaviour = this.parent.getBehaviour (this.keys.join ("."));
		else {
			this.behaviour = {
				show: true,
				readonly : false,
				mandatory: false
			}
			if (this.parent) this.parent.setBehaviour (this.keys.join ("."), this.behaviour);
		}

		setTimeout( () => {
			if(this.schema.onInit) this.schema.onInit();
		})
	}
	
	ngOnDestroy (){
		if (!this.schema.preserveOnDestroy){
			this.formProperty._value = null;
		}
	}
}