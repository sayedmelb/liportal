import { Injectable } from '@angular/core';

@Injectable()
export class AppConstants {
	public static URBBIT="optus";
	public static APP_NAME = "9826cb81-b6c6-4f2a-9dd0-3844b64ec04f"; //Optus
	// public static API_ENDPOINT='http://dtu000194:8080/'; //arindam mc
	//  public static API_ENDPOINT='http://sdns-dr.sit.corp.uecomm.com.au:8080/'; //umelad79
	// public static API_ENDPOINT = "http://umelat56:9401/api/portal/schema"; //mule
	public static API_ENDPOINT = "http://sdns-liquid.sit.corp.uecomm.com.au:80/api/portal/schema"; //mule
	public static API_ENDPOINT_VLAN = "http://10.124.110.23:9401/api/portal/data/vlanAvailability"; //mule
	//public static API_ENDPOINT_VLAN = "http://sdns-liquid.sit.corp.uecomm.com.au:80/api/portal/data/vlanAvailability"; //mule

	
	public static secret = "OptusSDX";	
	public ITEM:string = "ITEM";
	public PARTY:string = "PARTY";

	public static uuid (){
		var d = new Date();
		function s4() {
		  return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		}
		return ('0' + d.getUTCDate()).slice(-2) + ('0' + (d.getUTCMonth()+1)).slice(-2) + ('0' + d.getUTCFullYear()).slice(-4) + "-" + ('0' + d.getUTCHours()).slice(-2) + ('0' + d.getUTCMinutes()).slice(-2) + "-" + ('0' + d.getUTCSeconds()).slice(-2) + ('0' + d.getUTCMilliseconds()).slice(-2)+ '-' + s4() + '-' + s4() + s4() + s4();
	}
	public static DECODER;
}
