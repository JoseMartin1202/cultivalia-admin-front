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
  {},
  {},
  {},
];

const ColumnsDataGallery=[
  {label:"Galería", attribute:"titulo", search:true},
  {label:"Fecha de creación", attribute:"fecha"},
];

const ColumnsDataPrecios=[
  {label:"Precio"},
  {label:"Año"},
  {label:"Fecha registro"},
  {label:"Es jimada"},
  {label:"Precio actual"}
];

export const Columns={
    ColumnsDataHome,
    ColumnsDataOfertas,
    ColumnsDataPredios,
    ColumnsDataGallery,
    ColumnsDataPrecios
}