import { formatCurrencyInput, sanitizeCurrencyInput } from "./formatCurrency"

export const calculateMissing = (producao: number, metaFinal: number, children?: any) => {   
    
    let contProducerd = 0
    if (!producao) producao = 0
    if (children) {

        children.map((child: { name: string, goal: number, produced: number }, index: number) => {
            contProducerd += child.produced           

        })     
        let result = metaFinal - contProducerd
        return result   
    }    
    let result = metaFinal - producao  
    return result
}


export const calculatePercentage = (producao: number, metaFinal: number, children? : any) => {
    
    if (!producao) producao = 0
    if (children) {
        let contProducerd = 0
        children.map((child: { name: string, goal: number, produced: number }, index: number) => {
            contProducerd += child.produced                 

        })    
        let result = (((contProducerd) / metaFinal) * 100).toFixed(1)   
        return result 
    }
    
    let result = (((producao) / metaFinal) * 100).toFixed(1)
    return result
}