const HomeFilterData = [
    { name: 'Todas', value: '' },
    { name: 'Pendientes', value: 'Pendiente' },
    { name: 'Validadas', value: 'Validada' },
    { name: 'Rechazadas', value: 'Rechazada' },
];

const OffersFilterData = [
    { name: 'Todas', value: '' },
    { name: 'Visibles', value: true },
    { name: 'No visibles', value: false },
    { name: 'Vigentes', value: 'Vigente' },
    { name: 'Finalizadas', value: 'Finalizada' },
    { name: 'Canceladas', value: 'Cancelada' },
];

const PricesFilterData = [
    { name: 'Todos', value: '' },
    { name: 'Actuales', value: true },
    { name: 'No actuales', value: false}
];

const SalesFilterData = [
  { name: 'Todas', value: '' },
  { name: 'Pendientes', value: 'Pendiente' },
  { name: 'Validadas', value: 'Validada' },
  { name: 'Rechazadas', value: 'Rechazada' },
  { name: 'Canceladas', value: 'Cancelada' },
];

const InversorsFilterData = [
  { name: 'Todos', value: '' },
  { name: 'Creados', value: 'Creado' },
  { name: 'En Revisión', value: 'Revision' },
  { name: 'Rechazados', value: 'Rechazado' },
  { name: 'Completos', value: 'Completo' },
  { name: 'Inactivos', value: 'Inactivo' },
];

const InversorDetailFilterData = [
  { name: 'Inversiones', value: 'Inversiones' },
  { name: 'Beneficiarios', value: 'Beneficiarios' },
  { name: 'Credenciales', value: 'Credenciales' },
  { name: 'Acciones', value: 'Acciones' }
];

const DistribucionDetail = [
  { name: 'Pagos', value: 'Pagos' },
  { name: 'Contratos', value: 'Contratos' },
  { name: 'Cartas', value: 'Cartas' }
];

  export const Filters={
    HomeFilterData,
    OffersFilterData,
    PricesFilterData,
    SalesFilterData,
    InversorsFilterData,
    InversorDetailFilterData,
    DistribucionDetail
  }