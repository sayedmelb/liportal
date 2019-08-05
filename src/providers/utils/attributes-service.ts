import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  NGXLogger
} from 'ngx-logger';
import {
  AttributeCard,
  ActionType
} from '../../models/service-details';
import * as _ from 'lodash';


const sdP2PSDE: Array < String > = ["contractedBw", "flexPack", "portCapacity", "vlan", "sla", "proactiveMonitoring", "gos", "monthlyRecurring", "serviceId", "topology"];
const sdP2PEWAN: Array < String > = ["contractedBw", "portCapacity", "vlan", "sla", "topology", "proactiveMonitoring", "gos", "monthlyRecurring", "serviceId", "productName"];
const sdMeshSDE: Array < String > = ["contractedBw", "flexPack", "portCapacity", "vlan", "sla", "proactiveMonitoring", "qos", "serviceId", "topology", "monthlyRecurring"];
const sdMeshEWAN: Array < String > = ["contractedBw", "portCapacity", "vlan", "sla", "topology", "proactiveMonitoring", "qos", "monthlyRecurring", "serviceId", "productName"];
const odP2PSDE = ["address", "", "", "", "", "", "", ""];
const odP2PEWAN = ["address", "", "", "", "", "", "", ""];
const odMeshSDE = [];
const odMeshEWAN = [];
@Injectable()
export class AttributesService {
  constructor(private logger: NGXLogger) {}
  private keys = {
    contractedBw: {
      key: "contractedBw",
      prop: "contractedBw",
      label: "Contracted Speed",
      action_type: ActionType.Links,
      options: ["Permanent Change", "Dynamic Flex Speed Change", "Schedule Flex Speed Change"],
      pipe: "bandwidth",
      default: "Not Available",
      flex: 20
    },
    flexPack: {
      key: "flex_pack",
      prop: "flex_pack",
      label: "Flex Pack",
      info: {
        label:"Flex Max ",
        calculator: "flexMax"
      },
      action_type: ActionType.Edit,
      default: "2x",
      flex: 20
    },
    portCapacity: {
      key: "portCapacity",
      prop: "portCapacity",
      label: "Port",
      action_type: ActionType.Edit,
      pipe: "portcapacity",
      default: "1 Gbps",
      flex: 20
    },
    gos: {
      key: "grade_of_service",
      prop: "grade_of_service",
      label: "Grade of Service",
      action_type: ActionType.Edit,
      default: "Not Available",
      flex: 20
    },
    qos: {
      key: "qos.status",
      prop: "qos.status",
      label: "QoS",
      action_type: ActionType.Edit,
      default: "Off",
      pipe: "onoff",
      flex: 20
    },
    sla: {
      key: "sd_fibre_sla",
      prop: "sd_fibre_sla",
      label: "Service Levels",
      action_type: ActionType.Edit,
      default: "Not Available",
      flex: 20
    },
    proactiveMonitoring: {
      key: "proactiveMonitoring",
      prop: "proactiveMonitoring",
      label: "Proactive Monitoring",
      action_type: ActionType.Edit,
      pipe: "onoff",
      default: "off",
      flex: 20
    },
    vlan: {
      key: "vlan",
      prop: "vlan",
      label: "VLAN",
      action_type: ActionType.Edit,
      default: "Not Available",
      flex: 20
    },
    monthlyRecurring: {
      key: "monthly_recurring",
      prop: "monthly_recurring",
      label: "Monthly Recurring",
      action_type: ActionType.Options,
      options: ["Install Charge - $100"],
      default: "Not Available",
      flex: 20
    },
    serviceId: {
      key: "serviceId",
      prop: "properties.service.properties.serviceId",
      label: "Service Id",
      action_type: ActionType.None,
      default: "TBA",
      flex: 20
    },
    topology: {
      key: "topology",
      prop: "properties.topology",
      label: "Network Topology",
      action_type: ActionType.None,
      default: "Not Available",
      flex: 20
    },
    address: {
      key: "address",
      prop: "properties.location.title",
      label: "Service Address",
      action_type: ActionType.None,
      default: "Not Available",
      flex: 40
    },
    productName: {
      key: "line",
      prop: "properties.line",
      label: "Product Name",
      action_type: ActionType.None,
      default: "Not Available",
      pipe: "networkname",
      flex: 20
    }
  };


  get(page, topology, productType, model, product): Array <AttributeCard> {
    this.logger.info("Getting card array from service -- ",page, topology, productType);
    if(page && topology && productType){
      topology = topology !== 'Mesh' ? "P2P": topology;
      let key = (page+topology+productType).toUpperCase();
      switch(key) {
        case 'SDP2PSDETHERNET':
          return this.getSDP2PSDE(model, product);
        case 'SDP2PEVOLVE':
          return this.getSDP2PEWAN(model, product);
        case 'SDMESHSDETHERNET':
          return this.getSDMeshSDE(model, product);
        case 'SDMESHEVOLVE':
          return this.getSDMeshEWAN(model, product);
        default:
          return this.getSDP2PSDE(model, product);
      }
    } else {
      throw new Error();
    }

  }
  getSDP2PSDE(model, product): Array < AttributeCard > {
    let response = new Array();
    let filtered = _.filter(this.keys, (value, key) => {
      return _.includes(sdP2PSDE, key);
    });
    _.forEach(filtered, schema => {
      if (_.has(model, schema.prop)) {
        this.add(response, model, schema.prop, schema);
      }
      else if (_.has(product, schema.prop)) {
        this.add(response, product, schema.prop, schema);
      }
    });
    return response;
  }

  getSDP2PEWAN(model, product): Array < AttributeCard > {
    let response = new Array();
    let filtered = _.filter(this.keys, (value, key) => {
      return _.includes(sdP2PEWAN, key);
    });
    _.forEach(filtered, schema => {
      if (_.has(model, schema.prop)) {
        this.add(response, model, schema.prop, schema);
      }
      else if (_.has(product, schema.prop)) {
        this.add(response, product, schema.prop, schema);
      }
    });
    return response;
  }

  getSDMeshSDE(model, product): Array < AttributeCard > {
    let response = new Array();
    let filtered = _.filter(this.keys, (value, key) => {
      return _.includes(sdMeshSDE, key);
    });
    _.forEach(filtered, schema => {
      if (_.has(model, schema.prop)) {
        this.add(response, model, schema.prop, schema);
      }
      else if (_.has(product, schema.prop)) {
        this.add(response, product, schema.prop, schema);
      }
    });
    return response;
  }

  getSDMeshEWAN(model, product): Array < AttributeCard > {
    let response = new Array();
    let filtered = _.filter(this.keys, (value, key) => {
      return _.includes(sdMeshEWAN, key);
    });
    _.forEach(filtered, schema => {
      if (_.has(model, schema.prop)) {
        this.add(response, model, schema.prop, schema);
      }
      else if (_.has(product, schema.prop)) {
        this.add(response, product, schema.prop, schema);
      }
    });
    return response;
  }
  add(response, model, key, schema) {
    response.push(new AttributeCard(schema, _.get(model, key, "")));
  }
  ngOnDestroy() {
    this.keys = undefined;
  }


}
