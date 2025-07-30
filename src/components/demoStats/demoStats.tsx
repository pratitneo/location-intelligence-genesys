import type { DemoStatsType } from '../../types/types';
import demoStatsCss from './demostats.module.scss';


const DemoStats = ({ icon, value, label }: DemoStatsType) => {

    const newValue = value.toLocaleString('en-IN');

    const words = label.split(' ');
    const firstTwo = words.slice(0, words.length - 1).join(' ');
    const lastWord = words[words.length - 1];

    return (
        <div className={`${demoStatsCss['lip-demoStats__box']}`}>
            <div className={`${demoStatsCss['lip-demoStats__icon-value']}`}>
                <img src={icon} alt="Contact" className={`${demoStatsCss['lip-demoStats__icon']}`} />
                <p className={`${demoStatsCss['lip-demoStats__value']}`}>{newValue}</p>
            </div>
            <div className={`${demoStatsCss['lip-demoStats__label']}`}>
                <span className={`${demoStatsCss['lip-demoStats__label-text']}`}>{firstTwo}</span>
                {lastWord && (
                    <span className={`${demoStatsCss['lip-demoStats__label-text']}`}>{lastWord}</span>
                )}
            </div>
        </div>
    )
}

export default DemoStats;