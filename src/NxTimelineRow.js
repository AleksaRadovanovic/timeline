import {Css} from './NxTimelineConsts.js'
import NxTimeLineBasicElem from './NxTimeLineBasicElem.js'

export default class NxTimelineRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_element: -1,
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleElementSelected = (sel_element) => {
        
        if(this.state.selected_element !== sel_element.id){
            this.setState({ selected_element : sel_element.id});
        }
        this.props.onElementSelected(sel_element);
    }
   
    getTimeObject = (time_data) => {
        let objTime ={ hour: 0, minute: 0};

        var time = new Date();
        time.setTime(time_data);
       
        objTime.hour = time.getHours() - this.props.hour_beg;
        objTime.minute = time.getMinutes();

        return objTime;
    }

    getPositionsByTime = (element) => {
        let positions = {startPosition :0, endPosition: 0};

        let start_time = this.getTimeObject(element.initial_time);
        let end_time = this.getTimeObject(element.final_time);

        let hours_cnt = this.props.hour_end - this.props.hour_beg + 1; 
        if (hours_cnt < 2)
            return null;

        let length = this.props.parentWidth - this.props.ticks_margins.left - this.props.ticks_margins.right;
        if(length < 0)
            return null;
            
        if( start_time.hour + this.props.hour_beg < this.props.hour_beg || Math.ceil(end_time.hour + end_time.minute/100) > this.props.hour_end ) 
            return null;

        let offset = length / (hours_cnt - 1);
        if(this.props.isActiveTimeTicksScroll && this.props.ticksDistance > offset) {
            offset = this.props.ticksDistance;
        }

        positions.startPosition =  offset*start_time.hour + offset * (start_time.minute/60); 
        positions.endPosition =  offset*end_time.hour + offset * (end_time.minute/60); 
        
        return positions;
    }
    
    getArrowPosition = (element) => {
        let position = 0;
        let start_time = this.getTimeObject(Math.abs(element.timestamp));

        let hours_cnt = this.props.hour_end - this.props.hour_beg + 1; 
        if (hours_cnt < 2)
            return null;

        let length = this.props.parentWidth - this.props.ticks_margins.left - this.props.ticks_margins.right;
        if(length < 0)
            return null;
            
        if( start_time.hour + this.props.hour_beg < this.props.hour_beg || Math.ceil(start_time.hour + start_time.minute/100) > this.props.hour_end ) 
            return null;

        let offset = length / (hours_cnt - 1);
        if(this.props.isActiveTimeTicksScroll && this.props.ticksDistance > offset) {
            offset = this.props.ticksDistance;
        }
        //calculate arrow position
        position =  offset*start_time.hour + offset * (start_time.minute/60); 
        
        return position;
    }

    renderBasicElement = (data,isSelected,id) => {

        return (
            <NxTimeLineBasicElem 
                bar_data={data}
                parentWidth={this.props.parentWidth}
                ticks_margins={this.props.ticks_margins}
                ticksDistance={this.props.ticksDistance}
                isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}
                hour_beg={this.props.hour_beg}
                hour_end={this.props.hour_end}
                handleLabelWidth={this.handleLabelWidth}
                onElementSelected={this.handleElementSelected}
                element_color={this.props.element_color}
                labels_width ={this.props.side_labels_width}
                bottom_labels_width={this.props.bottom_labels_width}
                element_labels_color={this.props.element_labels_color}
                isSelected={isSelected}
                key={id}
                barID={id}/>
         );
    }

    renderBasicElements = () => {
        let bars = [];
        let prevPosition = 0;

        let i=0;
        while (i < this.props.elements.length) {
             let element = this.props.elements[i];

             let elementPositions = this.getPositionsByTime(element);
             if(elementPositions == null) { i++; continue;} 
             
             element.startPosition = elementPositions.startPosition ;
             element.sideTextWitdh = this.props.side_labels_width;
             element.width = elementPositions.endPosition - elementPositions.startPosition + element.sideTextWitdh*2;
 
             let start = elementPositions.startPosition - element.sideTextWitdh;
             //calculate position(margin left) if it's not first bar in this row
             if(i>0){
                 elementPositions.startPosition = elementPositions.startPosition - Math.abs(prevPosition);
             }
             
             let isSelectedElement = this.state.selected_element === element.id;
             element.marginLeft = elementPositions.startPosition - element.sideTextWitdh;
             bars.push(this.renderBasicElement(element, isSelectedElement, i));
             
             prevPosition = start+element.width;
             
             i++;
        }
        console.log(i + 'i');
        return bars;
    }

    renderArrow = (id,marginLeft,type,color) => {
        return (
            <div key={id} className="nx-timeline-arrow-container" style={{left: marginLeft}}>
                <img src={"images/timeline-arrow-"+type+"-"+color+".png"} style={{width: 22}}></img>
            </div>
        );
    }

    generateArrows = () => {
        let elements = this.props.elements;

        let array = [];
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if(element.timestamps == undefined) continue;

            for (let j = 0; j < element.timestamps.length; j++) {
                let arrowPosition = this.getArrowPosition(element.timestamps[j]);
                
                let type = "up";
                if(element.timestamps[j].timestamp  < 0) 
                    type = "down";

                array.push(this.renderArrow(element.id*100+j, arrowPosition-10, type, element.timestamps[j].color));
            }
        }
        return array;
    }

    generateLevelInnerHtml = () => {
        let innerHtml = this.props.level.innerHtml;
        return {__html: innerHtml};
    }

    render() {        
        let bars = this.renderBasicElements();
        let timestamps = this.generateArrows();

        return (
            <div  className={Css.MAIN_ROW_CLASS } >
                <div className={Css.TIMELINE_LABELS }  style={{ minWidth: this.props.width_first_column + 1,maxWidth: this.props.width_first_column + 1}} >
                    <div dangerouslySetInnerHTML={this.generateLevelInnerHtml()} />
                </div>
                <div>
                    <div style={{display : "flex"}}>
                     {bars}
                    </div>
                    <div className="nx-timeline-arrows-container" >
                        <div style= {{ position: 'relative'}}>
                            {timestamps}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}