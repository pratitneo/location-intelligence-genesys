import type { PointerType, SitePointerType } from "../../types/types"
import pointerCss from './sitePointers.module.scss'
import { Images } from "../../assets/assets"

const SitePointers = ({ pointersData }: SitePointerType) => {
    return (
        <>
            {pointersData?.map((pointer: PointerType, index) => {
                return (
                    <div key={index} className={`${pointerCss['lip-pointer__wrap']} ${(typeof pointer?.value === 'string' && pointer?.value?.toLowerCase() === 'low') ? pointerCss['lip-pointer--red'] : pointerCss['lip-pointer--green']}`}>
                        <img src={(typeof pointer?.value === 'string' && pointer?.value?.toLowerCase() === 'low') ? Images?.pointerLow : Images?.pointerHigh} alt="" />
                        <p className={`${pointerCss['lip-pointer__value']}`}>{pointer?.value}</p>
                        <p className={`${pointerCss['lip-pointer__label']}`}>{pointer?.label}</p>
                    </div>
                )
            })}
        </>
    )
}

export default SitePointers