export type DrinkType = {
    idDrink: string
    strDrink: string
    strDrinkThumb: string
}

export type FilterType = {
    drinks: Array<DrinkType>
    id: number
    strCategory: string,
    selected: boolean
}