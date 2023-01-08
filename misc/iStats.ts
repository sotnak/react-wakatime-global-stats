export interface IStats {
    languages: ILanguages[]
}

export interface ILanguages {
    average: IValue
    max: IValue
    median: IValue
    sum: IValue
    name: string
}

export interface IValue{
    seconds: number
    text: string
}