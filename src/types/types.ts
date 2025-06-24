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
    getInputValue?: (inputEvent: any) => void
    getInputToggle?: (inputEvent: any) => void
}
export type ButtonType = {
    buttonText?: string
    customCls?: string
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
}
export type LoginDataType = {
    userEmail: string,
    userPassword: string
}