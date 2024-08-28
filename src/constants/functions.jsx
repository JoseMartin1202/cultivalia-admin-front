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

export const emptyPredio =()=>{
      return {
      nombre:'',
      anio:'',
      galeria:'',
      latitud:'',
      longitud:'',
      plantasTotales:'',
      plantasDisponibles:'',
      hectareas:''
   }
}

export const emptyGalería =()=>{
   return {
   titulo:''
   }
}