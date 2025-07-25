import { createContext, useContext, useState } from 'react'
import type { ContextType, IconKey, SidebarValueType } from '../types/types'

const SidebarContext = createContext<SidebarValueType | undefined>(undefined)
export const SidebarProvider = ({ children }: ContextType) => {

    const [panelName, setPanel] = useState('')
    const [rightIconKey, setRightIconKey] = useState<IconKey | null>(null);

    const updatePanelName = (value: string) => {
        setPanel(value)
    }

    return (
        <SidebarContext.Provider value={{ panelName, setPanel, updatePanelName, rightIconKey, setRightIconKey }}>
            {children}
        </SidebarContext.Provider>
    )
}
export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) throw new Error('Please check SidebarConext')
    return context
}

