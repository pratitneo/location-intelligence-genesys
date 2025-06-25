import type { ProfileBoxType } from '../../types/types'
// import Separator from '../separator/separator'
import boxCss from './profileBox.module.scss'
const ProfileBox = ({ head, children, getEditFn }: ProfileBoxType) => {
    return (
        <div className={`${boxCss['lip-profile__box']}`}>
            <div className={`${boxCss['lip-profile__box-header']}`}>
                <p className={`${boxCss['lip-profile__box-head']}`}>{head}</p>
                <div className={`${boxCss['lip-profile__box-edit']}`} onClick={getEditFn}><img src="/assets/edit-pen.png" alt="Edit Button" /></div>
            </div>
            {/* <Separator separator /> */}
            {children}
        </div>
    )
}

export default ProfileBox