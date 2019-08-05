interface Serializable<T> {
    deserialize(input: Object): T;
}

export class Party{
	name:string="Guest";
	featureImage:string="assets/image/party.png";
	hardware: Hardware;
	location: Address;
}

export class Hardware  implements Serializable<Hardware>{
	cordova:string;
	model:string;
	platform:string;
	uuid:string;
	version:string;
	manufacturer:string;
	isVirtual:string;
	serial:string;
	isBlocked:boolean;
	height:number;
	width:number;
	isApp:boolean;
	layout:string;
	location:any;	
	deserialize(input) {
		return this;
	}
}

export class Address  implements Serializable<Address>{
	latitude:number=0;
	longitude:number=0;
	address:string = '';
	locality:string;
	city:string;
	state:string;
	country:string;
	postcode:string;
	place_id:string;
	searched_on:string = new Date().toISOString();
	deserialize(input) {
		this.latitude = input.latitude?input.latitude:0;
		this.longitude = input.longitude?input.longitude:0;
		this.address = input.address?input.address:null;
		this.locality = input.locality?input.locality:null;
		this.city = input.city?input.city:null;
		this.state = input.state?input.state:null;
		this.country = input.country?input.country:null;
		this.postcode = input.postcode?input.postcode:null;
		this.place_id = input.place_id?input.place_id:null;
		this.searched_on = input.searched_on?input.searched_on:new Date().toISOString();
		return this;
	}
}

