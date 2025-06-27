import { point } from "leaflet"
import type { PointerType, SitePointerType } from "../../types/types"
import pointerCss from './sitePointers.module.scss'
import { Images } from "../../assets/assets"

const SitePointers = ({ pointersData }: SitePointerType) => {
    return (
        <>
            {pointersData?.map((pointer: PointerType, index) => {
                return (
                    <div key={index} className={`${pointerCss['lip-pointer__wrap']}`}>
                        <img src={Images?.pointerHigh} alt="" />
                        <p className={`${pointerCss['lip-pointer__value']}`}>{pointer?.value}</p>
                        <p className={`${pointerCss['lip-pointer__label']}`}>{pointer?.label}</p>
                    </div>
                )
            })}
        </>
    )
}

export default SitePointers