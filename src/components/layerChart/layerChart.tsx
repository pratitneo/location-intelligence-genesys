import ChartHead from "../chartHead/chartHead";
import POIdistInfo from "../poiDistInfo/poidistInfo";
import layerChartCss from './layerChart.module.scss'
const LayerChart = () => {
  return (
    <div className={`${layerChartCss['lip-layerChart__wrap']}`}>
        <ChartHead head={'POI Distribution'}/>
        <POIdistInfo number={'18920'} category={'Households'} distance={'0.7km'} customClswrap={'wrap__row'} customClsnumber={'number'} customClscontainer={'container'} customClscategory={'category'} customClsdisance={'distance'}/>
        <POIdistInfo number={'18920'} category={'Households'} distance={'0.7km'} customClswrap={'wrap__col'} customClsnumber={'number'} customClscontainer={'container'} customClscategory={'category'} customClsdisance={'distance'}/>
    </div>
  )
}

export default LayerChart;