import {Css} from './NxTimelineConsts.js'

export default class NxTimeticksNowLine extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    getCurrentTimeObject = () => {
        let objTime = { hour: 0, minute: 0}

        var time = new Date();
        time.setTime(this.props.current_time);
       
        objTime.hour = time.getHours();
        objTime.minute = time.getMinutes();

        return objTime;
    }

    getLineThickness = () => {
        let thickness = this.props.thicknessNowLine;

        if(thickness === "thin") return 1;
        else if(thickness === "standard") return 3;
        else  return 5;
    }


    renderLine = () => {
        let curr_time = this.getCurrentTimeObject();
        
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
        
        let left = this.props.ticks_margins.left + offset * (curr_time.hour + curr_time.minute/60); 
        let lineThickness = this.getLineThickness();
        let lineHeight = this.props.container_height ;

        return (
            <div id="mainLine" className={Css.TIMELINE_NOW_LINE} 
                style={{
                    position : 'absolute',
                    left : left,
                    cursor: 'move',
                    width : lineThickness, 
                    height : lineHeight,
                    border: '0px',
                    borderRight: lineThickness+'px solid ' + this.props.colorNowLine,
                    borderStyle: this.props.appearanceNowLine,
                    opacity: 0.55 
                }}
            />
        );
    }

    render() {        
        let nowLine = this.renderLine();
        return (
            <div>
               {nowLine}
            </div>
        );
    }
}