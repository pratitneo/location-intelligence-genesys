export type HeadingType = {
    head: string
}
export type LoginInputType = {
    inputLabel: string
    inputType: string
    inputName: string
    inputId: string
    inputPlaceholder?: string
    icon?: string
    customCls?: string
    inputValue?: string
    freezeInput?: boolean
    getInputValue?: (inputEvent: any) => void
    getInputToggle?: (inputEvent: any) => void
}
export type ButtonType = {
    buttonText?: string
    getBtnState?: boolean
    customCls?: string
    getBtnAction?: () => void
}
export type SeparatorType = {
    separatorText?: string
    separator?: boolean
}
export type ProfileType = {
    userName?: string
    fullName?: string
}
export type TabsType = {
    tabsData: TabsObj[]
    customCls?: string
    changeTabs: (tab: TabsObj, index: number) => void
}
export type TabsObj = {
    id: number | string,
    label: string
    active: boolean
}
export type ProfileBoxType = {
    head?: string
    children?: React.ReactNode
    editBtn?: boolean
    getEditFn?: () => void
    getEditState?: boolean
}
export type LoginDataType = {
    userEmail: string,
    userPassword: string
}
export type PersonalDataType = {
    firstName: string
    lastName: string
    userName: string
    userEmail: string
}
export type PersonalInfoType = {
    getEditState?: boolean
    getSaveAction?: () => void
}
export type CategoryType = {
    location: string
    attributes: any[]
    date: string
}
export type CategoryBoxType = {
    savedLocations: CategoryType[]
}
export type SiteScoreType = {
    score?: string | number
    location?: string
}
export type PointerType = {
    icon?: string
    value: string
    label: string
}
export type SitePointerType = {
    pointersData?: PointerType[]
}
export type ScoreBtnType = {
    icon?: any
}
export type SiteScoreBtnsType = {
    btnsData: ScoreBtnType[]
}
export type SiteDrpDwnItemType = {
    id: number | string
    icon?: any,
    label: string
}
export type SiteDrpDwnType = {
    drpDwnData?: SiteDrpDwnItemType
    children?: React.ReactNode

}