/*
import fetch from 'node-fetch';

const response = await fetch('https://api.github.com/users/github');
const data = await response.json();

console.log(data);
*/

const fetch = require('node-fetch');

exports.handler = async (event) => {
var info;
const mensajes = [];
if(event.sessionState.intent.name=="GetCountryData"){
 var tipo = event.sessionState.intent.slots.Estado.value.interpretedValue;
 var pais = event.sessionState.intent.slots.pais.value.interpretedValue;
 
 var consulta = "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=Country_Region%20%3D%20'"+pais.toUpperCase()+"'&outFields=Country_Region,Deaths,Confirmed,Incident_Rate,Mortality_Rate&outSR=4326&f=json"

	const response = await fetch(consulta);
	const body = await response.text();
	const APIData = JSON.parse(body);
	
 switch (tipo) {
  case 'Muertos':
   info = "La cantidad muertos por COVID-19 en "+ APIData.features[0].attributes.Country_Region + " es "+APIData.features[0].attributes.Deaths;
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });
    break;
   
  case 'Enfermos':
   info = "El total de casos de COVID-19 en "+ APIData.features[0].attributes.Country_Region + " es "+APIData.features[0].attributes.Confirmed;
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });
    break;
   
  case 'Indices':
   info = "Los indicadores en "+ APIData.features[0].attributes.Country_Region + " son:\n  Índice de Incidencia:"+APIData.features[0].attributes.Incident_Rate+"\n Índice de Mortalidad:"+APIData.features[0].attributes.Mortality_Rate;
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });
    break;
  default:
   info = "ay no sé jaja perdón :/";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });
    }
}else if (event.sessionState.intent.name=="GetInformacion"){
 var dato = event.sessionState.intent.slots.dato.value.interpretedValue;
 switch (dato) {
  case 'Vacunas':
   info = "Las 5 vacunas que están liderando con su respectiva efectividad son:";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });
   info = "ASTRA ZENECA(70,4%),\nPFIZER(95%),\nMODERNA(94,5%),\nSPUTNIK V(91,6%),\nJANSSEN(72%)";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });break;
  case 'Síntomas':
   // code
   info = "Los síntomas más habituales son los siguientes:"+
   "\nFiebre"+
   "\n,Tos"+
   "\n,Cansancio"+
   "\n,Pérdida del gusto o del olfato";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    })
   info = "\nLos síntomas menos habituales son los siguientes:"+
   "\nDolor de garganta"+
   "\n,Dolor de cabeza"+
   "\n,Molestias y dolores"+
   "\n,Diarrea"+
   "\n,Erupción cutánea o pérdida del color de los dedos de las manos o los pies"+
   "\n,Ojos rojos o irritados";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    })
   info = "\nLos síntomas serios son los siguientes"+
   "\nDificultad para respirar o disnea"+
   "\n,Pérdida de movilidad o del habla o sensación de confusión"+
   "\n,Dolor en el pecho";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    })
   break;
  case 'Origen':
   info = "El 31 de diciembre de 2019, la Organización Mundial de la Salud (OMS) recibió reportes de presencia de neumonía, de origen desconocido, en la ciudad de Wuhan, en China. Rápidamente, a principios de enero, las autoridades de este país identificaron la causa como una nueva cepa de coronavirus. La enfermedad ha ido expandiéndose hacia otros continentes como Asia, Europa y América.\n"+ 
   "En cuanto a su comienzo, todavía no se ha confirmado el posible origen animal de la COVID-19.";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    })
   break;
  case 'Tratamiento':
   info = "La mayoría de las personas que padecen COVID‑19 sufren síntomas de intensidad leve a moderada y se recuperan sin necesidad de tratamientos especiales. Sin embargo, algunas personas desarrollan casos graves y necesitan atención médica.\n";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });
    info = "Por favor no te automediques y mucho menos con ivermectina o dióxido de cloro.";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    });
   break;
  
  default:
   // code
   info = "ay no sé, es que me da pena 7u7";
   mensajes.push(
    {
     "content": info,
     "contentType": "PlainText"
    })
 }
}else{
 info = "vamo a juga";
}
   return {
 "messages": mensajes,
 "sessionState": {
  "dialogAction": {
   "type": "Close"
  },
  "intent": {
   "name": "GetCountryData",
   "state": "Fulfilled",
   "confirmationState": "None"
  },
  "originatingRequestId": "0c094981-c0f6-4677-b8e9-d0521a7abe8e"
 },
 "sessionId": "956594409797657"
}
}