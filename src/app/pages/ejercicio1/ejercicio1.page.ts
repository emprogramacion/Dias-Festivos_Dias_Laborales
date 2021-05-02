import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicio1',
  templateUrl: './ejercicio1.page.html',
  styleUrls: ['./ejercicio1.page.scss'],
})
export class Ejercicio1Page implements OnInit {

   fecha_inicial:Date;
   fecha_final:Date;
   dias_festivos_fijos =['01-01','05-01','07-20','08-07','12-08','12-25'];
   dias_trasladables=[];
   dias_festivos_pascuas=[];
   label_festivo:string;

  constructor() { }
//ionic generate (g) page pages/ejercicio1
  ngOnInit() {
 
  }

  buscar() {

    if(!this.fecha_final || !this.fecha_inicial) {
      
      this.label_festivo="Fechas obligatorias";
      return;
    }

    this.fecha_inicial= new Date(this.fecha_inicial);
    this.fecha_final= new Date(this.fecha_final);
    
    if(this.fecha_final<=this.fecha_inicial) {
      
      this.label_festivo="La fecha final debe ser mayo que la fecha inicial";
      return;
    }

    var fecha= new Date(this.fecha_inicial);
    var diferencia = this.fecha_final.getTime()-this.fecha_inicial.getTime();
    var dias_totales = Math.floor(diferencia/(1000*3600*24))+1;
    var dias_habiles:number=0;
    for(var i=0;i<dias_totales;i++){

    if(!(i==0)){
      fecha.setDate(fecha.getDate()+1);

    } 
    if(fecha.getDay() !=0 && fecha.getDay()!=6){
      var dia=fecha.getDate();
      var mes=fecha.getMonth()+1;
      var is_festivo= this.festivo_fijo(dia,mes,this.dias_festivos_fijos);
      if(!is_festivo){
        this.dias_trasladables=[];
        var anio=fecha.getFullYear();

        is_festivo = this.festivo_trasladable(anio,this.dias_trasladables,mes,dia);
        if(!is_festivo){
          this.dias_festivos_pascuas=[];
          var fecha_pascua= this.calcular_pascua(anio);
          is_festivo=this.festivo_pascua(fecha_pascua,this.dias_festivos_pascuas,mes,dia);
        
          if(!is_festivo){
            dias_habiles++;
          }
        }
       
      }

    } 
    } 
this.label_festivo="Hay "+dias_habiles+" días habiles";
    if(dias_habiles==1){
      this.label_festivo="Hay un día habil";

    }
    
  }

  festivo_fijo(dia,mes,dias_festivos){

    if(mes<10){
      mes='0'+mes;
    }
    if(dia<10){dia ='0'+dia;}

   

   var dia_fijo= dias_festivos.find(element => element==mes+'-'+dia);
    if(!dia_fijo){
      return false;
    }    

    return true;



  
      
  }

  festivo_trasladable(anio,dias_trasladables,mes,dia){
  
    if(mes<10){
      mes='0'+mes;
    }
    if(dia<10){dia ='0'+dia;} 
  
  var reyes_magos = new Date(anio+'-01-07');
  this.push_trasladables(dias_trasladables,reyes_magos,mes,dia);
  var san_jose = new Date(anio+'-03-20');
  this.push_trasladables(dias_trasladables,san_jose,mes,dia);
 var san_pedro = new Date(anio+'-06-30');
  this.push_trasladables(dias_trasladables,san_pedro,mes,dia);
 var virgen = new Date(anio+'-08-16');
  this.push_trasladables(dias_trasladables,virgen,mes,dia);
 var dia_raza = new Date(anio+'-10-13');
  this.push_trasladables(dias_trasladables,dia_raza,mes,dia);
 var todos_santos = new Date(anio+'-11-02');
  this.push_trasladables(dias_trasladables,todos_santos,mes,dia);
 var cartagena = new Date(anio+'-11-12');
  this.push_trasladables(dias_trasladables,cartagena,mes,dia);
  

  var dia_fijo= dias_trasladables.find(element => element==mes+'-'+dia);
  if(!dia_fijo){
    return false;
  }    

  return true;
  }

  push_trasladables(dias_trasladables,dia_trasladable,mes,dia){
    var dia_semana = dia_trasladable.getDay();
  
    switch (dia_semana) {
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
  
   festivo_pascua(fecha_pascua,dias_pascuas,mes,dia){

    if(mes<10){
      mes='0'+mes;
    }
    if(dia<10){dia ='0'+dia;} 
   fecha_pascua=new Date(fecha_pascua); 
   fecha_pascua.setDate(fecha_pascua.getDate()+1); 
  var jueves_santos=new Date(fecha_pascua);
  var viernes_santos=new Date(fecha_pascua);
  var ascension_jesus=new Date(fecha_pascua);
  var corpus_christi=new Date(fecha_pascua);
  var sagrado_corazon=new Date(fecha_pascua);
  

   jueves_santos.setDate(jueves_santos.getDate()-3);
   this.push_santos(dias_pascuas,jueves_santos,dia,mes);
   viernes_santos.setDate(viernes_santos.getDate()-2);
   this.push_santos(dias_pascuas,viernes_santos,dia,mes);
   ascension_jesus.setDate(ascension_jesus.getDate()+43);
   this.push_santos(dias_pascuas,ascension_jesus,dia,mes);
   corpus_christi.setDate(corpus_christi.getDate()+64);
   this.push_santos(dias_pascuas,corpus_christi,dia,mes);
   sagrado_corazon.setDate(sagrado_corazon.getDate()+71);
   this.push_santos(dias_pascuas,sagrado_corazon,dia,mes);
   
   var dia_fijo= dias_pascuas.find(element => element==mes+'-'+dia);
   if(!dia_fijo){
     return false;
   }    

   return true;

  }

  calcular_pascua(anio){
    
   var a=Math.floor(anio%19);
   var b=Math.floor(anio%4);
   var c=Math.floor(anio%7);
   var k=Math.floor(anio/100);
   var p=Math.floor((13+8*k)/25);
   var q=Math.floor(k/4);
   var m=Math.floor(15-p+k-q)%30;
   var n=Math.floor(4+k-q)%7;
   var d=Math.floor(19*a + m)%30;
   var e=Math.floor(2*b+4*c+6*d + n)%7;

    if(e+d>9){
          if((e+d-9<10)){
            return (anio+"-04-0"+((e)+(d)-9));
          }
          return (anio+"-04-"+((e)+(d)-9));



     
    }else{
      if((e+d+22<10)){
        return (anio+"-03-0"+(e+d+22));
      }
      return (anio+"-03-"+(e+d+22));

    }

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

}


