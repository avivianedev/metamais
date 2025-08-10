export const getFormattedDateTime = (data: Date) => {
    const formattedDate = data.toLocaleDateString('pt-br')
    const formattedTime = data.toLocaleTimeString('pt-br')
    return `${formattedDate} - ${formattedTime}`
}