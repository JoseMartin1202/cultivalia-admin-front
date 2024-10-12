export const valueFromId = (id, obj) => {
    return id.split('.').reduce((acc, curr) => {
       if (Object.keys(acc).length === 0) return ''
       return (acc[curr] !== null && acc[curr] !== undefined) ? acc[curr] : ''
    }, obj)
}

export const getErrorMessage = (error) => {
    const statusCode = error?.response?.status || null
    if (statusCode >= 500) {
       return "Un error ha ocurrido con el server"
    }
    let errObj = error?.response?.data || null
    if (errObj) {
       let messages = Object.values(error.response.data)
          .reduce((acc, curr) => acc + `${curr.toString()}\n `, "")
       if (messages.length > 0 && messages.length < 70)
          return messages
    }
    
    return "Ocurrió un error, valida que la contraseña sea mayor a 6 caracteres"
}

export const emptyGaleria =()=>{
   return {
      titulo:''
   }
}

export const emptyOffer =()=>{ 
   return {
      tipo:'Directa',
      plantas_totales_directa:'',
      plantas_totales_indirecta:'',
      plantas_disponibles_directa:'',
      plantas_disponibles_indirecta:'',
      precio_reventa:'',
      predio_directa:'',
      distribucion:'',
      predio_indirecta:'',
      is_visible_directa:true,
      is_visible_indirecta:true,
      vendedor:''
   }
}

export function formatDateLong({ data }) {
   let value = ""
   if (data === null) return value

   value = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'long',
      hourCycle: 'h12',
      timeStyle: 'short',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone

   }).format(new Date(data));

   return value
}

export function formatDateMedium({ data }) {
   let value = ""
   if (data === null) return value

   value = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'medium',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
   }).format(new Date(data));

   return value
}