import { createContext, useContext, useState } from 'react'
import type { ContextType, SidebarValueType } from '../types/types'

const SidebarContext = createContext<SidebarValueType | undefined>(undefined)
export const SidebarProvider = ({ children }: ContextType) => {
    const [panelName, setPanel] = useState('')
    const updatePanelName = (value: string) => {
        setPanel(prev => prev === value ? '' : value)
    }

    return (
        <SidebarContext.Provider value={{ panelName, setPanel, updatePanelName }}>
            {children}
        </SidebarContext.Provider>
    )
}
export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) throw new Error('Please check SidebarConext')
    return context
}

