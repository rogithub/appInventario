import { ICliente } from "../models/iCliente";
import { BinderService } from "../services/binderService";
import toShortDate from "../shared/toShortDate";
import toShortMonth from "../shared/toShortMonth";
import toCurrency from "../shared/toCurrency";

export interface IVentaMonedero {
    clienteId: string,
    ajusteId: string,
    dineroDigitalDisponible: number,
    dineroDigitalGastado: number,
    fechaAjuste: string,
    fechaExpiracion: string,
}
export interface IMonederoData {
    cliente: ICliente,
    ventaMonederos: IVentaMonedero[]
}

export class Monedero {
    public data: IMonederoData;
    public init: KnockoutObservable<boolean>;
    public miembroDesde: KnockoutComputed<string>;
    public dineroDisponible: KnockoutComputed<number>;
    constructor()
    {
      const self = this;      
      this.init = ko.observable<boolean>(false);
      this.miembroDesde = ko.computed<string>(() => {
        if (self.init() === false) return "";   
        return toShortMonth(self.data.cliente.fechaCreado);
      }, self);
      this.dineroDisponible = ko.computed<number>(() => { 
        if (self.init() === false) return 0;       
        return self.data.ventaMonederos.reduce( (prev, it) => {
          return prev + it.dineroDigitalDisponible;
        }, 0);
      }, self); 
    }

    public loadData(data: IMonederoData)
    {
      const self = this;
      self.data = data;
      self.init(true);
    }

    public toShortDate (date: Date) {
      const self = this;
      return toShortDate(date);
    }

    public toCurrency (amt: number) {
      const self = this;
      return toCurrency(amt);
    }
}

const monedero = $("#monedero");
const monederoAttr = "data-cliente-id";
let getId = () => monedero.attr(monederoAttr);

document.addEventListener('DOMContentLoaded', async () => {
  const id = getId();
  let url = `https://papeleria.xplaya.com/app/getdata?clienteId=${id}`;
  var resp = await fetch(url);
  var data = await resp.json() as unknown;
  var d = data as IMonederoData;
  if (d && d.cliente && d.cliente.id) {    
    monedero.attr(monederoAttr, d.cliente.id);
    let page = new Monedero();
    page.loadData(d);
    BinderService.bind(page, "#monederoPage");
    console.log("binding ko");    
  }
  else {
    let visita = `<p>Visita la papelería para obtener la applicación móvil</p>`;
    $("#monedero-data").contents();
  }

}, false);

// Registering Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
      .register("/static/sw.js")
      .then(registration => {
          console.log("Service Worker Registered");
          console.log(registration);
      }).catch(err => {
          console.log("Fail registering Service Worker");
          console.log(err);
      });
} else {

}