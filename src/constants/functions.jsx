export const valueFromId = (id, obj) => {
    return id.split('.').reduce((acc, curr) => {
       if (Object.keys(acc).length === 0) return ''
       return (acc[curr] !== null && acc[curr] !== undefined) ? acc[curr] : ''
    }, obj)
}

export const getErrorMessage = (error) => {
    const statusCode = error?.response?.status || null
    if (statusCode >= 500) {
       return "An error has occurred with the server"
    }
    let errObj = error?.response?.data || null
    if (errObj) {
       let messages = Object.values(error.response.data)
          .reduce((acc, curr) => acc + `${curr.toString()}\n `, "")
       if (messages.length > 0 && messages.length < 70)
          return messages
    }
    return "An error has occurred while processing the request"
 }