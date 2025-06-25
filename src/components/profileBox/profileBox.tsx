import type { ProfileBoxType } from '../../types/types'
import Separator from '../separator/separator'
// import Separator from '../separator/separator'
import boxCss from './profileBox.module.scss'
const ProfileBox = ({ head, children, editBtn, getEditFn }: ProfileBoxType) => {
    return (
        <div className={`${boxCss['lip-profile__box']}`}>
            <div className={`${boxCss['lip-profile__box-header']}`}>
                <p className={`${boxCss['lip-profile__box-head']}`}>{head}</p>
                {editBtn ? <div className={`${boxCss['lip-profile__box-edit']}`} onClick={getEditFn}><img src="/assets/edit-pen.png" alt="Edit Button" /></div> : ''}
            </div>
            <Separator separator />
            {children}
        </div>
    )
}

export default ProfileBox