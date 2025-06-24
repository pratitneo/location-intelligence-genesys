import type { TabsObj, TabsType } from '../../types/types'
import tabCss from './tabs.module.scss'
const Tabs = ({ tabsData, customCls, changeTabs }: TabsType) => {
    return (
        <div className={`${tabCss['lip-tabs__wrap']}`}>
            {tabsData?.map((tab: TabsObj, index: number) => {
                return (
                    <div key={index} className={`${tabCss['lip-tabs__tab']} ${tabCss[`${customCls}`]} ${tab?.active ? 'lip-profile__tab--active' : ''}`} onClick={() => changeTabs(tab, index)}>{tab?.label}</div>
                )
            })}
        </div>
    )
}

export default Tabs