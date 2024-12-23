import EstadoView from "../components/estado";

const ColumnsDataHome= [
    { label: "Supervisión", attribute:"mov", search:true},
    { label: "Descripción", attribute: "supervisar", search:true},
    { label: "Estado", attribute: "estado",Component: EstadoView },
    { label: "Fecha", attribute: "fechaRegistro" } 
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
  {label:"Inversor", attribute:"nombre",search:true},
  {label:"Puede invertir", attribute:"completo",Component: EstadoView},
  {label:"Usuario", attribute:"usuario"},
  {label:"Curp", attribute:"curp"},
  {label:"Sexo", attribute:"sexo"},
  {label:"Telefono", attribute:"telefono"},
  {label:"Dirección", attribute:"direccion"},
  {label:"Estado", attribute:"estado"},
  {label:"Asesor", attribute:"asesor"},
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
  {label:"Comentarios", attribute:"comentarios"},
  {label:"Estado", attribute:"estado",Component: EstadoView},
  {label:"Inversor", attribute:"inversor",search:true},
];

const ColumnsDataAjusteTiempos=[
  {label:"Predio", attribute:"predio", search:true},
  {label:"Años de contrato", attribute:"contratoVariables",Component: EstadoView,option:"anio"},
  {label:"Porcentaje Cultivalia", attribute:"contratoVariables",Component: EstadoView,option:"porcentaje"},
  {label:"Comentarios", attribute:"comentarios"}
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
    ColumnsDataAjusteTiempos
}