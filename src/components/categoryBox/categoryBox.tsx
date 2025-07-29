import type { CategoryBoxType, CategoryType } from '../../types/types';
import categoryCss from './categoryBox.module.scss'
const CategoryBox = ({ savedLocations }: CategoryBoxType) => {
    return (
        <>
            {savedLocations?.map((item: CategoryType, idx: number) => (
                <div className={`${categoryCss['lip-category__wrap']}`} key={idx}>
                    <p className={`${categoryCss['lip-category__head']}`}>{item?.location ?? ''} site analysis</p>
                    <div className={`${categoryCss['lip-category__names__date']}`}>
                        <div className={`${categoryCss['lip-category__names']}`}>
                            {(item?.attributes as string[])?.map((attr: string, index: number) => {
                                return (
                                    <p key={index} className={`${categoryCss['lip-category__name']}`}>{attr ? attr : ''}</p>
                                )
                            })}
                        </div>
                        <p className={`${categoryCss['lip-category__date']}`}>{item?.date ?? ''}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CategoryBox