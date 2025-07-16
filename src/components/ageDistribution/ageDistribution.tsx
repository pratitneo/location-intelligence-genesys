import ageCss from "./ageDistribution.module.scss";
import { Images } from "../../assets/assets";
import type { AgeDistributionType } from "../../types/types";

const AgeDistribution = ({ ageRange, total, male, female }: AgeDistributionType) => {
  return (
    <div className={`${ageCss["lip-ageDist__container"]}`}>
      <p className={`${ageCss["lip-ageDist__range"]}`}>{ageRange}</p>
      <p className={`${ageCss["lip-ageDist__total"]}`}>{total}</p>
      <div className={`${ageCss["lip-ageDist__gender"]}`}>
        <img src={Images.distributionMale} alt="Male Distribution" />
        <span className={`${ageCss["lip-ageDist__value"]}`}>{male}</span>
      </div>

      <div className={`${ageCss["lip-ageDist__gender"]}`}>
        <img src={Images?.distributionFemale} alt="Female Distribution" />
        <span className={`${ageCss["lip-ageDist__value"]}`}>{female}</span>
      </div>
    </div>
  );
};

export default AgeDistribution;
