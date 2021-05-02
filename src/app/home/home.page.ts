import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fecha:Date;
  anio:any;
  a:any;
  b:any;
  c:any;
  k:any;
  p:any;
  q:any;
  m:any;
  n:any;
  d:any;
  e:any;
  fecha_pascua:any;
  mes:any;
  dia:any;
  dia_fijo:any;
  is_festivo:boolean;
  label_festivo:string;
  dias_festivos_fijos =['01-01','05-01','07-20','08-07','12-08','12-25'];
  dias_festivos_pascuas=[];
  dias_festivos_trasladables=[];
  jueves_santos:any;
  viernes_santos:any;
  sagrado_corazon:any;
  corpus_christi:any;
  ascension_jesus:any;
  reyes_magos:any;
  dia_semana:number;
  san_jose:any;
  san_pedro:any;
  virgen:any;
  cartagena:any;
  todos_santos:any;
  dia_raza:any;
  constructor(){}

  
  calcular_festivo(evento){
  this.fecha=new Date(evento.detail.value);
  this.anio=this.fecha.getFullYear();
  this.mes=this.fecha.getMonth()+1;
 // this.dia= this.fecha.getDay();
  this.dia = this.fecha.getDate();
  this.dias_festivos_pascuas=[];
  this.dias_festivos_trasladables=[];
 this.is_festivo= this.festivo_fijo(this.dia,this.mes,this.dias_festivos_fijos);


  if(this.is_festivo){
    this.label_festivo="Es día festivo";
     return;
  }
 
  this.fecha_pascua= this.calcular_pascua(this.anio);
  this.is_festivo=this.festivo_pascua(this.fecha_pascua,this.dias_festivos_pascuas,this.mes,this.dia);

  if(this.is_festivo){
    this.label_festivo="Es día festivo";
     return;
  }
  this.is_festivo=this.festivo_trasladable(this.anio,this.dias_festivos_trasladables,this.mes,this.dia);
  if(this.is_festivo){
    this.label_festivo="Es día festivo";
     return;
  }

  this.label_festivo="No es día festivo";

  }

  festivo_pascua(fecha_pascua,dias_pascuas,mes,dia){

    if(mes<10){
      mes='0'+mes;
    }
    if(dia<10){dia ='0'+dia;} 
   fecha_pascua=new Date(fecha_pascua); 
   fecha_pascua.setDate(fecha_pascua.getDate()+1); 
   this.jueves_santos=new Date(fecha_pascua);
   this.viernes_santos=new Date(fecha_pascua);
   this.ascension_jesus=new Date(fecha_pascua);
   this.corpus_christi=new Date(fecha_pascua);
   this.sagrado_corazon=new Date(fecha_pascua);
  

   this.jueves_santos.setDate(this.jueves_santos.getDate()-3);
   this.push_santos(dias_pascuas,this.jueves_santos,dia,mes);
   this.viernes_santos.setDate(this.viernes_santos.getDate()-2);
   this.push_santos(dias_pascuas,this.viernes_santos,dia,mes);
   this.ascension_jesus.setDate(this.ascension_jesus.getDate()+43);
   this.push_santos(dias_pascuas,this.ascension_jesus,dia,mes);
   this.corpus_christi.setDate(this.corpus_christi.getDate()+64);
   this.push_santos(dias_pascuas,this.corpus_christi,dia,mes);
   this.sagrado_corazon.setDate(this.sagrado_corazon.getDate()+71);
   this.push_santos(dias_pascuas,this.sagrado_corazon,dia,mes);
   
   this.dia_fijo= dias_pascuas.find(element => element==mes+'-'+dia);
   if(!this.dia_fijo){
     return false;
   }    

   return true;

  }
  push_santos(dias_pascuas,dia_santo,dia,mes){
   mes=dia_santo.getMonth()+1;
   dia = dia_santo.getDate();
   if(mes<10){
    mes='0'+mes;
  }
  if(dia<10){dia ='0'+dia;}
  dias_pascuas.push(mes+'-'+dia);

  }
  festivo_fijo(dia,mes,dias_festivos){

    if(mes<10){
      mes='0'+mes;
    }
    if(dia<10){dia ='0'+dia;}

   

   this.dia_fijo= dias_festivos.find(element => element==mes+'-'+dia);
    if(!this.dia_fijo){
      return false;
    }    

    return true;



  
      
  }

  calcular_pascua(anio){
    
    this.a=Math.floor(anio%19);
    this.b=Math.floor(anio%4);
    this.c=Math.floor(anio%7);
    this.k=Math.floor(anio/100);
    this.p=Math.floor((13+8*this.k)/25);
    this.q=Math.floor(this.k/4);
    this.m=Math.floor(15-this.p+this.k-this.q)%30;
    this.n=Math.floor(4+this.k-this.q)%7;
    this.d=Math.floor(19*this.a + this.m)%30;
    this.e=Math.floor(2*this.b+4*this.c+6*this.d + this.n)%7;

    if(this.e+this.d>9){
          if((this.e+this.d-9<10)){
            return (this.anio+"-04-0"+(parseInt(this.e)+parseInt(this.d)-9));
          }
          return (this.anio+"-04-"+(parseInt(this.e)+parseInt(this.d)-9));



     
    }else{
      if((this.e+this.d+22<10)){
        return (this.anio+"-03-0"+(parseInt(this.e)+parseInt(this.d)+22));
      }
      return (this.anio+"-03-"+(parseInt(this.e)+parseInt(this.d)+22));

    }

  }
  festivo_trasladable(anio,dias_trasladables,mes,dia){
  
    if(mes<10){
      mes='0'+mes;
    }
    if(dia<10){dia ='0'+dia;} 
  
  this.reyes_magos = new Date(anio+'-01-07');
  this.push_trasladables(dias_trasladables,this.reyes_magos,mes,dia);
  this.san_jose = new Date(anio+'-03-20');
  this.push_trasladables(dias_trasladables,this.san_jose,mes,dia);
  this.san_pedro = new Date(anio+'-06-30');
  this.push_trasladables(dias_trasladables,this.san_pedro,mes,dia);
  this.virgen = new Date(anio+'-08-16');
  this.push_trasladables(dias_trasladables,this.virgen,mes,dia);
  this.dia_raza = new Date(anio+'-10-13');
  this.push_trasladables(dias_trasladables,this.dia_raza,mes,dia);
  this.todos_santos = new Date(anio+'-11-02');
  this.push_trasladables(dias_trasladables,this.todos_santos,mes,dia);
  this.cartagena = new Date(anio+'-11-12');
  this.push_trasladables(dias_trasladables,this.cartagena,mes,dia);
  

  this.dia_fijo= dias_trasladables.find(element => element==mes+'-'+dia);
  if(!this.dia_fijo){
    return false;
  }    

  return true;
  }

  push_trasladables(dias_trasladables,dia_trasladable,mes,dia){
    this.dia_semana = dia_trasladable.getDay();
  
    switch (this.dia_semana) {
      case 0:
        dia_trasladable.setDate(dia_trasladable.getDate()+1);
      break;
      case 1:
      break;
      case 2:
        dia_trasladable.setDate(dia_trasladable.getDate()+6);
      break;
      case 3:
        dia_trasladable.setDate(dia_trasladable.getDate()+5);
      break;
      case 4:
        dia_trasladable.setDate(dia_trasladable.getDate()+4);
      break;
      case 5:
        dia_trasladable.setDate(dia_trasladable.getDate()+3);
      break;
      case 6:
        dia_trasladable.setDate(dia_trasladable.getDate()+2);
      break;
    }

    mes=dia_trasladable.getMonth()+1;
    dia = dia_trasladable.getDate();
    
    if(mes<10){
     mes='0'+mes;
   }
   if(dia<10){dia ='0'+dia;}
   dias_trasladables.push(mes+'-'+dia);
 
   }
}
