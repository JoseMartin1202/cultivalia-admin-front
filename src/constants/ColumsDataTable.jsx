import EstadoView from "../components/estado";

const ColumnsDataHome= [
    { label: "Supervisión", attribute:"entidad", search:true},
    { label: "Descripción", attribute: "supervisar", search:true},
    { label: "Estado", attribute: "estado",Component: EstadoView },
    { label: "Fecha", attribute: "fechaRegistro" }, 
  ];
const ColumnsDataOfertas=["Cantidad de plantas","Plantas restantes","Precio por planta", "Estado", "Predio","Estatus",""];
const ColumnsDataPredios=["Predio","Plantas totales","Plantas disponibles","ssasasad", "Hectareas", "Año", "Galería",""];
const ColumnsDataGallery=["Galería","Fecha de creación","Predios relacionados",""];
const ColumnsDataPrecios=["Precio","Año","Fecha registro", "Es jimada", "Precio actual",""];

export const Columns={
    ColumnsDataHome,
    ColumnsDataOfertas,
    ColumnsDataPredios,
    ColumnsDataGallery,
    ColumnsDataPrecios
}