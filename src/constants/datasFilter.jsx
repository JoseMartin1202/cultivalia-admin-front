const HomeFilterData = [
    { name: 'Todas', value: '' },
    { name: 'Pendientes', value: 'Pendiente' },
    { name: 'Validadas', value: 'Validada' },
    { name: 'Rechazadas', value: 'Rechazada' },
];

const OffersFilterData = [
    { name: 'Todas', value: 'todas' },
    { name: 'Visibles', value: 'visibles' },
    { name: 'No visibles', value: 'noVisibles' },
    { name: 'Vigentes', value: 'vigentes' },
    { name: 'Finalizadas', value: 'finalizadas' },
];

const PricesFilterData = [
    { name: 'Todos', value: 'todas' },
    { name: 'Actuales', value: 'actuales' },
    { name: 'No actuales', value: 'noActuales' }
];

  export const Filters={
    HomeFilterData,
    OffersFilterData,
    PricesFilterData
  }