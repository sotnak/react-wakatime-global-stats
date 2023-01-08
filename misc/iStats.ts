export interface IStats {
    languages: ICategory[]
    editors: ICategory[]
    operating_systems: ICategory[]
}

export interface ICategory {
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