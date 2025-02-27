import { Component } from "react";
import EstadoView from "../components/estado";
import { formatDateLong } from "./functions";

const ColumnsDataHome= [
    { label: "Supervisión", attribute:"mov", search:true},
    { label: "Fecha", attribute: "fechaRegistro" } ,
    { label: "Hora", attribute: "horaRegistro" } ,
    { label: "Estado", attribute: "estado",Component: EstadoView }
  ];

const ColumnsDataPredios=[
  {label:"Predio",attribute:"nombre", search:true},
  {label:"Plantas totales",attribute:"plantasTotales"},
  {label:"Plantas disponibles",attribute:"plantasDisponibles"},
  {label:"Hectareas ",attribute:"hectareas"},
  {label:"Año",attribute:"anio",key:""},
  {label:"Galeria",attribute:"galeria",key:""}
];

const ColumnsDataOfertas=[
  {label:"Plantas totales", attribute:"plantas_totales"},
  {label:"Plantas restantes", attribute:"plantas_restantes"},
  {label:"Precio por planta", attribute: "precio_planta"},
  {label:"Precio reventa",attribute: "precio_reventa"},
  {label:"Descuento",attribute: "descuento_porcentaje"},
  {label:"Año", attribute: "anio_precio"},
  {label:"Estado",attribute: "estado", Component: EstadoView},
  {label:"Predio",attribute: "predio", search:true},
  {label:"Estatus", attribute: "is_visible", Component: EstadoView },
  {label:"Origen",attribute: "tipo", Component: EstadoView },
  {label:"Fecha",attribute: "fecha_creacion"},
];

const ColumnsDataGallery=[
  {label:"Galería", attribute:"titulo", search:true},
  {label:"Fecha de creación", attribute:"fecha"},
];

const ColumnsDataPrecios=[
  {label:"Precio",attribute:"precio"},
  {label:"Año",attribute:"anio"},
  {label:"Fecha registro",attribute:"fechaRegistro"},
  {label:"Es jimada",attribute:"isJimated",Component: EstadoView},
  {label:"Precio actual", attribute:"isCurrent",Component: EstadoView}
];

const ColumnsDataVentas=[
  {label:"Monto", attribute:"monto",},
  {label:"Tipo", attribute:"tipo"},
  {label:"Estado", attribute:"estado",Component: EstadoView},
  {label:"Comprador", attribute:"comprador",search:true},
  {label:"Fecha registro", attribute:"fecha"},
  {label:"Código referido", attribute:"codigoReferido"},
];

const ColumnsDataInversores=[
  {label:"Inversor", attribute:"inversor",search:true},
  {label:"Estatus", attribute:"status",Component: EstadoView},
  {label:"Correo electronico", attribute:"usuario"},
  {label:"Telefono", attribute:"telefono"},
  {label:"Fecha de ingreso", attribute:"fechaRegistro"},
  {label:"Asesor", attribute:"asesor"},
  {label:"Pais", attribute:"pais"},
];

const ColumnsDataAsesores=[
  {label:"Nombre", attribute:"nombre",search:true},
  {label:"Apellidos", attribute:"apellidos",search:true},
  {label:"Telefono", attribute:"telefono"}
];

const ColumnsDataJimas=[
  {label:"Predio", attribute:"predio",search:true},
  {label:"Fecha", attribute:"fecha"},
  {label:"Precio por Kilo", attribute:"precioKilo"},
  {label:"Peso promedio por planta", attribute:"pesoPromedioPlanta"},
];

const ColumnsDataPagosSalientes=[
  {label:"Monto", attribute:"monto"},
  {label:"Fecha registro", attribute:"fechaRegistro"},
  {label:"Metodo", attribute:"metodo"},
  {label:"Desripción", attribute:"descripcion"},
  {label:"Estado", attribute:"estado",Component: EstadoView},
  {label:"Inversor", attribute:"inversor",search:true},
];

const ColumnsDataAjusteTiempos=[
  {label:"Predio", attribute:"predio", search:true},
  {label:"Años de contrato", attribute:"contratoVariables",Component: EstadoView,option:"anio"},
  {label:"Porcentaje Cultivalia", attribute:"contratoVariables",Component: EstadoView,option:"porcentaje"},
  {label:"Comentarios", attribute:"comentarios"}
];

const ColumnsDataGanancias=[
  {label:"Monto", attribute:"monto", search:true},
  {label:"Fecha", attribute:"fecha"},
  {label:"Descripcion", attribute:"descripcion", search:true}
];

// Con la nueva tabla

const ColumnsDistribucionesData= [
  {label:"Estado", attribute:"estado",Component:(item)=> EstadoView({state:item.data})},
  { label: "Monto", attribute:"monto"},
  { label: "Total de plantas", attribute:"totalPlantas"},
  { label: "Tipo", attribute: "tipo", Component: (t)=> t.data=="Inversion" ? "Inversión":"Comisión"},
  { label: "Procedencia", attribute: "procedencia"},
  { label: "Predio", attribute: "predio"} ,
  { label: "Precio por planta", attribute: "precioPlanta" } ,
  { label: "Registro", attribute: "fecha_registro",Component: (data)=> data.data && formatDateLong(data)}
];

const ColumnsVentasData= [
  {label:"Monto", attribute:"monto"},
  {label:"Tipo", attribute:"tipo"},
  {label:"Estado", attribute:"estado",Component:(item)=> EstadoView({state:item.data})},
  {label:"Fecha registro", attribute:"fecha",Component: (data)=>formatDateLong(data) },
  {label:"Código referido", attribute:"codigoReferido",Component: (c)=> c.data ? `${c.data?.codigo} (${c.data.inversor.nombre} ${c.data.inversor.apellidos})`:'---'},
];

const ColumnsPagosSalientes=[
  {label:"Monto", attribute:"monto"},
  {label:"Fecha registro", attribute:"fechaRegistro",Component: (data)=>formatDateLong(data)},
  {label:"Metodo", attribute:"metodo"},
  {label:"Comentarios", attribute:"comentarios"},
  {label:"Estado", attribute:"estado",Component:(item)=> EstadoView({state:item.data})},
  {label:"Inversor", attribute:"inversor",Component: (inversor)=>inversor.data.nombre+" "+inversor.data.apellidos},
];

const ColumnsPagosEntrantes=[
  {label:"Monto", attribute:"monto"},
  {label:"Fecha registro", attribute:"fechaRegistro",Component: (data)=>formatDateLong(data)},
  {label:"Metodo", attribute:"metodo"},
  {label:"Comentarios", attribute:"comentarios"},
  {label:"Estado", attribute:"estado",Component:(item)=> EstadoView({state:item.data})},
  {label:"Inversor", attribute:"inversor",Component: (inversor)=>inversor.data.nombre+" "+inversor.data.apellidos},
  {label:"Venta", attribute:"venta", Component: (v)=>`${v.data?.detalles[0]?.predio} (${v.data?.detalles[0]?.cantidad} ${v.data?.detalles[0]?.cantidad>1 ? 'plantas':'planta'})`}
];

const ColumnsBeneficiarios=[
  {label:"Nombre", attribute:"nombre"},
  {label:"Apellidos", attribute:"apellidos"},
  {label:"Sexo", attribute:"sexo",Component:(s)=>s.data=='F' ? 'Femenino':'Masculino'},
  {label:"Telefono", attribute:"telefono"},
  {label:"Parentesco", attribute:"parentesco"},
];

const ColumnsContratos=[
  {label:"ID", attribute:"id"},
  {label:"Estado", attribute:"estado",Component:(item)=> EstadoView({state:item.data})},
  {label:"Contrato base", attribute:"file", Component:(data)=> data.data ? 'Si':'---'},
  {label:"Contrato firmado", attribute:"fileSigned",Component:(data)=> data.data ? 'Si':'---'},
  {label:"Contrato anterior", attribute:"contratoAnterior",Component:(data)=> data.data ? data.data:'---'},
  {label:"Invalidez", attribute:"motivoInvalidez",Component:(data)=> data.data ? data.data:'---'},
  {label:"Fecha Creación", attribute:"fechaCreacion",Component: (data)=>formatDateLong(data)},
  {label:"Fecha validación", attribute:"fecha_validacion",Component: (data)=> data.data ? formatDateLong(data):'---'},
  {label:"Beneficiario", attribute:"beneficiario"},
];

const ColumnsCartas=[
  {label:"ID", attribute:"id"},
  {label:"Estado", attribute:"estado",Component:(item)=> EstadoView({state:item.data})},
  {label:"Carta base", attribute:"file", Component:(data)=> data.data ? 'Si':'---'},
  {label:"Carta firmada", attribute:"fileSigned",Component:(data)=> data.data ? 'Si':'---'},
  {label:"Motivo", attribute:"motivo",Component:(item)=> EstadoView({state:item.data})},
  {label:"Creación", attribute:"fechaCreacion",Component: (data)=>formatDateLong(data)},
];

export const Columns={
    ColumnsDataHome,
    ColumnsDataOfertas,
    ColumnsDataPredios,
    ColumnsDataGallery,
    ColumnsDataPrecios,
    ColumnsDataVentas,
    ColumnsDataInversores,
    ColumnsDataAsesores,
    ColumnsDataJimas,
    ColumnsDataPagosSalientes,
    ColumnsDataAjusteTiempos,
    ColumnsDataGanancias,
    ColumnsDistribucionesData,
    ColumnsVentasData,
    ColumnsPagosSalientes,
    ColumnsPagosEntrantes,
    ColumnsBeneficiarios,
    ColumnsContratos,
    ColumnsCartas
}