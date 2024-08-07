import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const QueryProvider = ({ children }) => {

   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            refetchOnWindowFocus: false,
            // tiempo antes de que los datos se consideren obsoletos.
            staleTime: 1000 * 60 * 25, // 25 minutos
            // timpo despues de la ultima consulta para que se borren de cache
            cacheTime: 1000 * 60 * 25, // 25 minutos
            retry: false,
         },
      },
   })

   return (
      <QueryClientProvider client={queryClient}>
         {children}
      </QueryClientProvider>
   )
}

export default QueryProvider