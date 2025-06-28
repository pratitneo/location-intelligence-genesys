import ageDistributionCss from "./ageDistribution.module.scss";
import { Images } from "../../assets/assets";

const AgeDistribution = ({
  ageRange,
  total,
  male,
  female,
}: {
  ageRange: string;
  total: string;
  male: string;
  female: string;
}) => {
  return (
    <div className={`${ageDistributionCss["lip-ageDistribution__wrap"]}`}>
      <div
        className={`${ageDistributionCss["lip-ageDistribution__container"]}`}
      >
        <p className={`${ageDistributionCss["lip-ageDistribution__range"]}`}>
          {ageRange}
        </p>
        <p className={`${ageDistributionCss["lip-ageDistribution__total"]}`}>
          {total}
        </p>
        <div className={`${ageDistributionCss["lip-ageDistribution__gender"]}`}>
          <img
            src={Images.distributionMale}
            alt="Male Distribution"
          />
          <span
            className={`${ageDistributionCss["lip-ageDistribution__Value"]}`}
          >
            {male}
          </span>
        </div>

        <div className={`${ageDistributionCss["lip-ageDistribution__gender"]}`}>
          <img
            src={Images?.distributionFemale}
            alt="Female Distribution"
          />
          <span
            className={`${ageDistributionCss["lip-ageDistribution__Value"]}`}
          >
            {female}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgeDistribution;
