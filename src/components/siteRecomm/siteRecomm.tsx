import SiteRecommHead from '../siteRecommHead/siteRecommHead'
import siteRecCss from './siteRecomm.module.scss'
import SiteRecommCard from '../siteRecommCard/siteRecommCard'
import type { DataSetType, RecommsArrType } from '../../types/types'
import Drpdwn from '../drpdwn/drpdwn'
import Separator from '../separator/separator'
import ButtonIcon from '../buttonIcon/buttonIcon'
import { Images } from '../../assets/assets'

const SiteRecomm = () => {
    const recomms: RecommsArrType[] = [{ location: 'charni road', score: 7, pincode: '400004', city: 'mumbai' }, { location: 'charni road', score: 7, pincode: '400004', city: 'mumbai' }, { location: 'charni road', score: 7, pincode: '400004', city: 'mumbai' }, { location: 'charni road', score: 7, pincode: '400004', city: 'mumbai' },]
    const pincodes: DataSetType[] = [{ label: '400012', value: 400012 }, { label: '400013', value: 400013 }, { label: '400014', value: 400014 }, { label: '400016', value: 400016 }, { label: '400018', value: 400018 }, { label: '400019', value: 400019 }, { label: '400022', value: 400022 }, { label: '400025', value: 400025 }, { label: '400028', value: 400028 }, { label: '400030', value: 400030 }, { label: '400050', value: 400050 }, { label: '400051', value: 400051 }, { label: '400052', value: 400052 }]

    return (
        <div className={`${siteRecCss['lip-siteRec__wrap']}`}>
            <SiteRecommHead />
            <div className={`${siteRecCss['lip-siteRec__drpDwns']}`}>
                <Drpdwn optsData={pincodes} mainCls='recomDrpDwn' selectId='pincode' optWrapCls='recomOpts' />
                <Drpdwn optsData={pincodes} mainCls='recomDrpDwn' selectId='cities' optWrapCls='recomOpts' />
            </div>
            <ButtonIcon btnText='show recommendation' mainCls='showRec' bgCls='violet' hoverCls='blue' trailIcon={Images?.showRecos} />
            <Separator separator />
            <div className={`${siteRecCss['lip-siteRec__cards']}`}>
                {recomms?.map((item: RecommsArrType, index: number) => {
                    return (
                        <SiteRecommCard key={index} cardData={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default SiteRecomm