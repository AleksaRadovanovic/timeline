import {Css} from './NxTimelineConsts.js'
import NxTimeLineElemLabel from './NxTimeLineElemLabel.js'

export default class NxTimeLineElemBottomLabels extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {}
   
    getStyle = () => {

        let style={
            marginLeft: this.props.marginLeft,
         };
 
         return style;
     }

    getTimeObject = (time_data) => {
        let objTime ={ hour: 0, minute: 0};

        var time = new Date();
        time.setTime(time_data);
       
        objTime.hour = time.getHours();
        objTime.minute = time.getMinutes();

        return objTime;
    }

    getPositionsByTime = (element) => {
        let barPositions = {startPosition :0, endPosition: 0};

        let start_time = this.getTimeObject(element.initial_time);
        let end_time = this.getTimeObject(element.final_time);

        let hours_cnt = this.props.hour_end - this.props.hour_beg + 1; 
        if (hours_cnt < 2)
            return null;

        let length = this.props.parentWidth - this.props.ticks_margins.left - this.props.ticks_margins.right;
        
        if(length < 0)
            return null;

        let offset = length / (hours_cnt - 1);        
        if(this.props.isActiveTimeTicksScroll && this.props.ticksDistance > offset) {
            offset = this.props.ticksDistance;
        }

        barPositions.startPosition =  offset*start_time.hour + offset * (start_time.minute/60); 
        barPositions.endPosition =  offset*end_time.hour + offset * (end_time.minute/60); 
        
        return barPositions;
    }

    renderLabel = (width, marginLeft ,marginTop, data, id) => {
        return (
                <NxTimeLineElemLabel 
                    labelWidth={width}
                    labelMarginLeft={marginLeft}
                    labelMarginTop={marginTop}
                    label_data={data}
                    labelColor={this.props.labelColor}
                    key={id}
                    isSelected={this.props.isSelected}/>
        );
    }

    renderLabels = () => {
        let labels_data = this.props.labels_data;
        let basicElementPosition = this.props.elementStartPosition;
        let labelsPos
        let labels = [];
        for (let i = 0; i < labels_data.length; i++) {

            if(labels_data[i] != null ){
                
                let labelWidth = this.props.bottom_labels_width;
                let marginLeft = 0;

                if(labels_data[i].initial_time != null && labels_data[i].final_time != null){
                    let labelPositions = this.getPositionsByTime(labels_data[i]);
                    if(labelPositions == null) return null;

                     labelWidth = labelPositions.endPosition - labelPositions.startPosition;
                     marginLeft = labelPositions.startPosition - basicElementPosition-5;
                }
                
                labels.push(this.renderLabel(labelWidth, marginLeft, 5, labels_data[i], i));
            }
                
        }

        return labels;
    } 

    render() {        
        let labels = this.renderLabels();
        
        return (
            <div className={Css.TIMELINE_ELEM_BOTTOM_LABELS+"bottomLabels"+this.props.labelID}  style={this.getStyle()}>
                {labels}
            </div>
        );
    }
}