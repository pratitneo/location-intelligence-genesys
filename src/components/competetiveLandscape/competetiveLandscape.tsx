import { useState } from 'react'
import { Images } from '../../assets/assets'
import type { CompetetiveItem, CompetitiveType } from '../../types/types'
import DrpdwnHead from '../drpdwnHead/drpdwnHead'
import compLandCss from './competetiveLandscape.module.scss'

const CompetetiveLandscape = ({ getCompetetiveData }: CompetitiveType) => {
    const [brandsData, setBrandsData] = useState(getCompetetiveData)
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    console.log(selectedBrands, 'selectedBrands')

    const selectBrand = (brandItem: any, compIndex: any, brandIndex: number) => {
        const updateBrands = brandsData?.map((item, itemIndex) => {
            if (compIndex !== itemIndex) return item
            return {
                ...item,
                brands: item?.brands?.map((brand, eachBrandIdx) => brandIndex === eachBrandIdx ? { ...brand, selected: true } : brand)
            }
        })
        setBrandsData(updateBrands)
        setSelectedBrands(prevBrands => {
            const updated = new Set([...prevBrands, brandItem?.name]);
            return Array.from(updated);
        });
    }
    const removeBrand = (compIndex: number, brandItem: any, brandIndex: number) => {
        const updateBrands = brandsData?.map((item, itemIndex) => {
            if (compIndex !== itemIndex) return item
            return {
                ...item,
                brands: item?.brands?.map((brand, eachBrandIdx) => brandIndex === eachBrandIdx ? { ...brand, selected: false } : brand)
            }
        })
        setBrandsData(updateBrands)
        setSelectedBrands(prevBrands => {
            const updated = prevBrands?.filter(brandName => brandItem?.name !== brandName);
            return updated;
        });
    }
    return (
        <div className={`${compLandCss['lip-compLand__main']}`}>
            <DrpdwnHead heading='competetive landscape' icon={Images?.compLandscape} />
            {brandsData?.map((compItem: CompetetiveItem, compIndex: number) => {
                return (
                    <div key={compIndex} className={`${compLandCss['lip-compLand__wrap']}`}>
                        {/* <div key={index} className={`${compLandCss['lip-compLand__item']}`}> */}
                        {/* head */}
                        <div className={`${compLandCss['lip-compLand__head']}`}>
                            <div className={`${compLandCss['lip-compLand__label']}`}>
                                <img src={Images?.railway} alt="" className={`${compLandCss['lip-compLand__icon']}`} />
                                <span className={`${compLandCss['lip-compLand__name']}`}>{compItem?.head}</span>
                                <span className={`${compLandCss['lip-compLand__count']}`}>(top 5)</span>
                            </div>
                            <div className={`${compLandCss['lip-compLand__addComp']}`}>
                                <img src={Images?.addCompetitor} alt="" />
                            </div>
                        </div>
                        {/* brand names */}
                        <div className={`${compLandCss['lip-compLand__brands']}`}>
                            {compItem?.brands?.map((brandItem: any, brandIndex: number) => {
                                return (
                                    <div key={brandIndex} className={`${compLandCss['lip-compLand__brandWrap']} ${brandItem?.selected ? compLandCss['lip-compLand--selected'] : ''}`} onClick={() => selectBrand(brandItem, compIndex, brandIndex)}>
                                        <p className={`${compLandCss['lip-compLand__brand']} ${brandItem?.selected ? compLandCss['lip-compLand--selected'] : ''}`}>{brandItem?.name ?? '-'}</p>
                                        {brandItem?.selected ? (<img src={Images?.brandDeSelect} alt="" className={`${compLandCss['lip-compLand__deSelect']}`} onClick={(deselect) => { deselect.stopPropagation(); removeBrand(compIndex, brandItem, brandIndex) }} />) : ''}
                                    </div>
                                )
                            })}
                        </div>
                        {/* </div> */}
                    </div>
                )
            })}
        </div>
    )
}

export default CompetetiveLandscape