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
    { name: 'Actuales', value: 'actuales' },
    { name: 'No actuales', value: 'noActuales' }
];

  export const Filters={
    HomeFilterData,
    OffersFilterData,
    PricesFilterData
  }