import EstadoView from "../components/estado";

const ColumnsDataHome= [
    { label: "Supervisión", attribute:"entidad", search:true},
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

export const Columns={
    ColumnsDataHome,
    ColumnsDataOfertas,
    ColumnsDataPredios,
    ColumnsDataGallery,
    ColumnsDataPrecios
}