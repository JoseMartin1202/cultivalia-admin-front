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

  export const Filters={
    HomeFilterData,
    OffersFilterData,
    PricesFilterData,
    SalesFilterData
  }