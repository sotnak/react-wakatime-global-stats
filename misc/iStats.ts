export interface IStats {
    languages: ILanguages[]
}

interface ILanguages {
    average: IValue
    max: IValue
    median: IValue
    sum: IValue
    name: string
}

interface IValue{
    seconds: number
    text: string
}