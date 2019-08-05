import {
  Component,
  ElementRef,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import {
  D3Service,
  D3
} from 'd3-ng2-service';
import * as _ from 'lodash';
import { DynamicPipe } from '../../pipes/DynamicPipe';
import { InputControlWidget } from '../../components/control-widget';
import { NGXLogger } from 'ngx-logger';

const MESH_LABEL = "Mesh Ethernet Network";
const MESH_KEYWORD = "Mesh";
const P2P_LABEL = "P2P Ethernet Network";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";
const A_END_LABEL = "A-End";
const B_END_LABEL = "B-End";

@Component({
  selector: "network-diagram",
  templateUrl: "network-diagram.html"
})
export class NetworkDiagram extends InputControlWidget implements OnInit {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @ViewChild("canvassvg") canvas: ElementRef;

  private node: any;
  private svg: any;
  private d3: D3;
  private container: any;
  private aspect: any;
  private selected: any;

  constructor(private d3Service: D3Service, private dynamicPipe: DynamicPipe, private logger: NGXLogger) { 
    super(); 
    this.logger.debug("Testing ngx logger");
  }
  ngOnInit() {
    //console.log("NETWORK DIAG SCHEMA", this.schema);
    //console.log("NETWORK DIAG MODEL", this.model);

  }
  responsivefy = (svg) => {
    // get container + svg aspect ratio
    let container = this.d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;
    this.container = container;
    this.aspect = aspect;
    // add viewBox and preserveAspectRatio properties,
    // and call resize so that this.svg resizes on inital page load
    this.svg = svg;
    svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("perserveAspectRatio", "xMinYMid")
      .call(this.resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    this.d3.select(window).on("resize." + container.attr("id"), this.resize);

  }

  // get width of container and resize svg to fit it
  resize = (svg) => {
    var targetWidth = parseInt(this.container.style("width"));
    this.svg.attr("width", targetWidth);
    this.svg.attr("height", Math.round(targetWidth / this.aspect));

  }
  
  getDataNodes(height, width): any {
    return [{
      r: width / 10,
      x: width / 10,
      y: height / 2,
      label: this.inputModel.aend.label,
      addressLine1: this.inputModel.aend.addressLine1,
      addressLine2: this.inputModel.aend.addressLine2,
      photo: "../../assets/imgs/building.png",
      url: "https://demo.mobiscroll.com/angular/cards/tabs#"
    },
    {
      r: 1,
      x: width / 2 - 60,
      y: height / 2 + 20,
      label: '',
      addressLine1: '',
      addressLine2: '',
      photo: "../../assets/imgs/cloud.png",
      url: ""
    },
    {
      r: width / 10,
      x: width / 1.25,
      y: height / 2,
      label: this.inputModel.bend.label,
      addressLine1: this.inputModel.bend.addressLine1,
      addressLine2: this.inputModel.bend.addressLine2,
      photo: "../../assets/imgs/building.png",
      url: "https://demo.mobiscroll.com/angular/cards/tabs#"
    }
    ]
  }

  width = 800;
  height = 300;

  renderNodes(width, height) {
    this.node.append('image')
      .attr('xlink:href', (d, i) => {
        return d.photo;
      })
      .attr('height', 60)
      .attr('width', 60)
      .attr('x', (d) => {
        return (d.x) - 30;
      })
      .attr('y', (d) => {
        return (d.y) - 50;
      });

    this.node.append('circle')
      .attr('r', (d) => { return d.r; })
      .attr('cx', (d) => {
        return (d.x);
      })
      .attr('cy', (d) => {
        return (d.y) + 20;
      })
      .on("click", (d) => this.selectNode(d)) ;

    let placeclass: string = '';
    let leftoffset: number = 30;

    let leftoffaddress1: number = 50;
    let addressoffset2: number = 50;  

    if (this.schema.datasource && _.has(this.schema.datasource[0], TOPOLOGY_PATH)) {
      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        placeclass = 'adress-label';
        leftoffset = 35;
        leftoffaddress1 = 35; //old value 60 (This is for addree line one of Mesh) 
        addressoffset2 = 40; //45;
      } else {
        placeclass = 'lbl-bold';
        leftoffset = 25;
        leftoffaddress1 = 55;
        addressoffset2 = 55;
      }
     
    }




    let text = this.node.append('g');

    let nodeLabels = text.append('text')

      .attr("y", (d) => {
        return (d.y) + 30;
      })
      .text((d) => {
        return d.label;
      }).attr("x", (d) => {
        return (d.x) - leftoffset;
      })

      .attr("class", placeclass);
    let addressLabel = text.append('text')
      .attr("x", (d) => {
        return (d.x) - leftoffaddress1; // this line is for address line 1
      })
      .attr("y", (d) => {
        return (d.y) + 50;
      })
      .text((d) => {
        return d.addressLine1;
      })
      .attr('class', 'adress-label')
      .attr('width', 10);
    let addressLabel2 = text.append('text')
      .attr("x", (d) => {
        return (d.x) - addressoffset2;
      })
      .attr("y", (d) => {
        return (d.y) + 65;
      })
      .text((d) => {
        return d.addressLine2;
      })
      .attr('class', 'adress-label')
      .attr('width', 10);
  }

  renderNetworkHeadings(width, height) {
    
    this.svg.append("text")
      .attr("y", height / 5)
      .attr("x", (width / 2) - 135)
      .attr("class", "header")
      .text(this.inputModel.networkName);

    this.svg.append("text")
      .attr("y", (height / 5) + 20)
      .attr("x", (width / 2) - 135)
      .attr("class", "header-description")
      .text(this.inputModel.networkLabel);
  }

  renderServiceProperties(width, height) {
    //AEND
    this.svg.append("text")
      .attr("y", (height / 2) - 20)
      .attr("x", (width / 4) - 20)
      .attr("class", "lbl-bold")
      .text(this.inputModel.aend.nwType);
    this.svg.append("text")
      .attr("y", (height / 2))
      .attr("x", (width / 4) - 20)
      .attr("class", "lbl")
      .text(this.inputModel.aend.serviceId);
    this.svg.append("text")
      .attr("y", (height / 2) + 30)
      .attr("x", (width / 4) - 20)
      .attr("class", "lbl-light")
      .text(this.inputModel.aend.bw);
    this.svg.append("text")
      .attr("y", (height / 2) + 50)
      .attr("x", (width / 4) - 20)
      .attr("class", "lbl")
      .text(this.inputModel.aend.portCap);

    //BEND
    this.svg.append("text")
      .attr("y", (height / 2) - 20)
      .attr("x", (width / 2) + 60)
      .attr("class", "lbl-bold")
      .text(this.inputModel.bend.nwType);
    this.svg.append("text")
      .attr("y", (height / 2))
      .attr("x", (width / 2) + 60)
      .attr("class", "lbl")
      .text(this.inputModel.bend.serviceId);
    this.svg.append("text")
      .attr("y", (height / 2) + 30)
      .attr("x", (width / 2) + 60)
      .attr("class", "lbl-light")
      .text(this.inputModel.bend.bw);
    this.svg.append("text")
      .attr("y", (height / 2) + 50)
      .attr("x", (width / 2) + 60)
      .attr("class", "lbl")
      .text(this.inputModel.bend.portCap);
  }

  renderConnectorLines(width, height) {
    this.svg.append("line")
      .attr('class', 'line')
      .attr("x1", (width / 8) - 38)
      .attr("y1", (height / 2) + 10)
      .attr("x2", (width / 2) - 85)
      .attr("y2", (height / 2) + 10);

    this.svg.append("line")
      .attr('class', 'line')
      .attr("x1", (width / 2) - 30)
      .attr("y1", (height / 2) + 10)
      .attr("x2", width - 142)
      .attr("y2", (height / 2) + 10);

    if (this.inputModel.isMesh) {
      this.svg.append("line")
        .attr('class', 'line')
        .attr("x1", (width / 2) - 30)
        .attr("y1", (height / 2) + 5)
        .attr("x2", width - 180)
        .attr("y2", (height / 2) + 5);
      this.svg.append("line")
        .attr('class', 'line')
        .attr("x1", (width / 2) - 30)
        .attr("y1", (height / 2))
        .attr("x2", width - 180)
        .attr("y2", (height / 2));
      this.svg.append("line")
        .attr('class', 'line')
        .attr("x1", (width / 2) - 30)
        .attr("y1", (height / 2) + 15)
        .attr("x2", width - 180)
        .attr("y2", (height / 2) + 15);
      this.svg.append("line")
        .attr('class', 'line')
        .attr("x1", (width / 2) - 30)
        .attr("y1", (height / 2) - 5)
        .attr("x2", width - 180)
        .attr("y2", (height / 2) - 5);
    }

  }

  renderSVG() {
    let width = this.width,
      height = this.height;
    this.svg = this.d3.select(this.canvas.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(this.responsivefy);

    //Get Data Nodes and Render
    let dataNodes = this.getDataNodes(height, width);
    this.node = this.svg.selectAll('.node')
      .data(dataNodes)
      .enter().append('g')
      .attr('class', 'node');
    this.renderNodes(width, height);

    //Add headings
    this.renderNetworkHeadings(width, height);

    // Add Service Properties (display on network line)
    this.renderServiceProperties(width, height);

    this.renderConnectorLines(width, height);

  }



  ngOnChanges(changes: SimpleChanges) {

    this.logger.debug(this.schema, changes);


    if (this.schema.datasource && _.has(this.schema.datasource[0], TOPOLOGY_PATH)) {
      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        this.inputModel = this.getInputModelForMesh(this.schema.datasource[0]);
      } else {
        this.inputModel = this.getInputmodelForP2P(this.schema.datasource[0]);
      }
      if (this.svg) {
        this.d3.select(this.canvas.nativeElement).select("svg").remove();
        this.renderSVG();
      }
    }

  }
  ngAfterViewInit() {
    this.d3 = this.d3Service.getD3();
    this.logger.debug("data in network diagram ->", this.schema, this.model);
    this.renderSVG();
  }

  inputModel: NetworkDiagramInputModel = {
    aend: {},
    bend: {}
  };

  ngOnDestroy() {
    this.d3.select(this.canvas.nativeElement).remove();
    this.d3 = null;
  }
  getInputModelForMesh(ds): NetworkDiagramInputModel {
    let resp: NetworkDiagramInputModel;
    let countOfNodes = ds.otherEnds ? ds.otherEnds.length : 0;
    resp = {
      isMesh: true,
      networkLabel: MESH_LABEL,
      networkName: this.getNetworkName(ds.selectedProduct.properties.resource),
      aend: {
        addressLine1: this.getCustomAddress('addressLine2',ds.selectedProduct.properties.location.title),//ds.selectedProduct.properties.location.title.split(",")[1],
        label: this.getCustomAddress('addressLine1', ds.selectedProduct.properties.location.title),
        nwType: this.getNetworkType(ds.selectedProduct.properties.line),
        serviceId: ds.selectedProduct.properties.service.properties.serviceId,
        bw: this.getBw(),
        portCap: this.dynamicPipe.portCapacity(_.get(ds, 'model[0].portCapacity', "1G"))
      },
      bend: {
        label: countOfNodes + " Services"
      }
    };
    return resp;
  }
  getInputmodelForP2P(ds): NetworkDiagramInputModel {
    let resp: NetworkDiagramInputModel;
    resp = {
      isMesh: false,
      networkLabel: P2P_LABEL,
      networkName: this.getNetworkName(ds.selectedProduct.properties.resource),
      aend: {
        label: A_END_LABEL,
        addressLine1: this.getCustomAddress('addressLine1',ds.selectedProduct.properties.location.title),//ds.selectedProduct.properties.location.title.split(",")[0],
        addressLine2: this.getCustomAddress('addressLine2',ds.selectedProduct.properties.location.title), //ds.selectedProduct.properties.location.title.split(",")[1],
        nwType: this.getNetworkType(ds.selectedProduct.properties.line),
        serviceId: ds.selectedProduct.properties.service.properties.serviceId,
        bw: this.getBw(),
        portCap: this.dynamicPipe.portCapacity(_.get(ds, 'model[0].portCapacity', "1G"))
      },
      bend: {
        label: B_END_LABEL,
        addressLine1: this.getCustomAddress('addressLine1', _.get(ds.otherEnds[0], "properties.location.title", ",")), //_.get(ds.otherEnds[0], "properties.location.title", ",").split(",")[0], 
        addressLine2: this.getCustomAddress('addressLine2', _.get(ds.otherEnds[0], "properties.location.title", ",")), //this.getFormatedAddressForinfoGraphic('addressLine2',_.get(ds.otherEnds[0], "properties.location.title", ",").split(",")[1]), //_.get(ds.otherEnds[0], "properties.location.title", ",").split(",")[1],
        nwType: this.getNetworkType(_.get(ds.otherEnds[0],"properties.line", "")),
        serviceId: _.get(ds.otherEnds[0], "properties.service.properties.serviceId", ""),
        bw: this.getBw(),
        portCap: this.dynamicPipe.portCapacity(_.get(ds, 'model[1].portCapacity', "1G"))
      }
    };
    return resp;
  }

  getFormatedAddressForinfoGraphic(line: string, inputAddress: string): string{
    //let addressAry = inputAddress.split(","); //_.words(inputAddress);
    let states_array = ['NSW','WA','QLD','SA','VIC','TAS','NT', 'ACT'];
    let trimaddress='';
    for(let loop:number =0; loop<states_array.length; loop++)
    {
      let indx = inputAddress.indexOf(states_array[loop]);
      if(indx!=-1)
      {
        trimaddress = inputAddress.slice(0,indx-inputAddress.length + 3); // to add the state
        break;
      }
    }
    if(trimaddress!=='')
    return trimaddress;
    else
    return inputAddress;
  }

  getCustomAddress(line: string, inputAddress: string): string{

    let fullAddress = inputAddress;

    let firstLineAddress='';
    let secondLineAddress='';

    let split_AddressAry = fullAddress.split(",");

    if(split_AddressAry.length==1 && line=='addressLine1') // if no comma most unlikely
    return this.getFormatedAddressForinfoGraphic(line,inputAddress);; //return the full address
    if(split_AddressAry.length==1 && line=='addressLine2')
    return ''; // dont need to return anything to stop duplication

    if(split_AddressAry.length==2 && line=='addressLine1')
    return split_AddressAry[0];
    if(split_AddressAry.length==2 && line=='addressLine2'){
      return this.getFormatedAddressForinfoGraphic(line,split_AddressAry[1]);
    }

    if(split_AddressAry.length==3 && line=='addressLine1')// add line one to line one and line 2 and 3 to 2nd array
    {
      firstLineAddress = split_AddressAry[0];
      return firstLineAddress; 
    }
    if(split_AddressAry.length==3 && line=='addressLine2') {
      secondLineAddress = split_AddressAry[1] + ',' +  split_AddressAry[2];
      return this.getFormatedAddressForinfoGraphic(line,secondLineAddress);
    }

    //will ignore anything greated than 4
    if(split_AddressAry.length>=4 && line=='addressLine1') {
      firstLineAddress =  split_AddressAry[0] + ',' +  split_AddressAry[1];
      return firstLineAddress;
    }
    if(split_AddressAry.length>=4 && line=='addressLine2') {
      secondLineAddress = split_AddressAry[2] + ',' +  split_AddressAry[3];
      return this.getFormatedAddressForinfoGraphic(line,secondLineAddress);
    }

    //console.log("fullAddress split_AddressAry", fullAddress, split_AddressAry);


    return '';
  }

  getBw(): string {
    if (_.has(this.schema.datasource[0], 'model') && _.has(this.schema.datasource[0].model[0], 'contractedBw') && !_.isNil(this.schema.datasource[0].model[0].contractedBw)) {
      return this.dynamicPipe.bandwidth(this.schema.datasource[0].model[0].contractedBw + "");
    } else {
      return this.dynamicPipe.bandwidth(this.schema.datasource[0].selectedProduct.properties.service.properties.bandwidth);
    }
  }
  getNetworkType(line): string {
    return this.dynamicPipe.networkName(line);
  }
  getNetworkName(resource) {
    if(resource && _.has(resource, "properties.vpnName")) {
      return resource.properties.vpnName;
    }
    return "";
  }
  selectNode (node): void{
    this.logger.debug("selected node =>", node);
		this.selected = {
			type: "node",
			data: node
		};
		// this.formProperty.setValue (this.selected, false);
	}
}



interface NetworkDiagramInputModel {
  isMesh?: boolean;
  networkLabel?: string;
  networkName?: string;
  aend?: {
    label?: string;
    addressLine1?: string;
    addressLine2?: string;
    nwType?: string;
    serviceId?: string;
    bw?: string;
    portCap?: string;
  },
  bend?: {
    label?: string;
    addressLine1?: string;
    addressLine2?: string;
    nwType?: string;
    serviceId?: string;
    bw?: string;
    portCap?: string;
  }
}
