import { ICliente } from "../models/iCliente";
import { BinderService } from "../services/binderService";
import toShortDate from "../shared/toShortDate";
import toShortMonth from "../shared/toShortMonth";
import toCurrency from "../shared/toCurrency";
const apiServer = window.location.hostname === "localhost" ? 
"http://localhost:5293" : "https://papeleria.xplaya.com";

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
    public navigatorShare: KnockoutObservable<boolean>;
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

      this.navigatorShare = ko.observable(
        window !== undefined &&
        window.navigator !== undefined &&
        window.navigator.share !== undefined
      );
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

    public async enivarMapa () {
      const self = this;      
      const title = "Compartir mapa";
      const text = "Compartir mapa";
      const url = "https://maps.app.goo.gl/rxAPksXn2iCjocSf7";
      try {
          await window.navigator.share({title, text, url});
          console.log('The content was shared successfully');
      } catch (e) {
          console.error('Error sharing the content', e);
      }
    }
}

let getIdFromStorage = () => localStorage.getItem("id");

document.addEventListener('DOMContentLoaded', async () => {
  let page = new Monedero();
  BinderService.bind(page, "#monederoPage");
  console.log("binding ko");

  const id = getIdFromStorage();  

  if (!id) {    
    return;
  }

  let url = `${apiServer}/app/getdata?clienteId=${id}`;
  var resp = await fetch(url);
  var data = await resp.json() as unknown;
  var d = data as IMonederoData;
  if (d && d.cliente && d.cliente.id) {        
    page.loadData(d);
  }

}, false);
