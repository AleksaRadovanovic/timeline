import {Css} from './NxTimelineConsts.js'
import NxTimelineBody from './NxTimelineBody.js'
import NxTimeticks from './NxTimeticks.js'
import NxTimeticksNowLine from './NxTimeticksNowLine.js'

//main component for rendering timeline 
//this component consists of several subcomponents
export default class NxTimeline extends React.Component {
    

    constructor(props) {
        super(props);  
        this.containerRef = React.createRef();

        this.state = {
            selected_cell : 0,
            container_height : 0,
            container_width : 0,
        }; 
    }

    componentDidMount() {
        this.setState({ container_height : this.containerRef.current.clientHeight, container_width : this.containerRef.current.clientWidth });
        this.props.changeParent(this.containerRef.current.clientWidth);
    }
   
    componentDidUpdate(){
    }

    componentWillUnmount() {
    }

    getTimeTicksContainerWidth(){
        
        let containerWidth = this.state.container_width;

        if(this.props.isActiveTimeTicksScroll) {
            let hours_cnt = this.props.hour_end - this.props.hour_beg ; 
            
            let width = hours_cnt * this.props.ticksDistance + this.props.width_first_column+10;  
            if( width > containerWidth ) 
                containerWidth = width;
        }

        return containerWidth;
    }

    handleElementSelected = (sel_element) => {
        this.props.onElementSelected(sel_element);
    }

    getCurrentDate = () =>{
        let currentDate = new Date(this.props.current_time);

        let minutes = currentDate.getMinutes();


        if(minutes < 10 ) minutes = "0"+minutes;

        let displayDate = currentDate.toLocaleDateString() +" "+ currentDate.getHours()+":"+minutes;
        return displayDate;
    }

    render() {
        let currentDate = this.getCurrentDate();

        let containerOverflowX = "hidden";
        if(this.props.isActiveTimeTicksScroll) 
            containerOverflowX = "auto";

        return (
           <div  style={{overflowX: 'hidden', position :  'relative', boxShadow:' 0px 2px 10px #999999', borderRadius: '3px', height: 'fit-content' }}>
               <div  className={Css.TIMELINE_HEADER_CONTAINER } style={{ height : this.props.bars_height*2 + this.props.ticks_margins.top +2, backgroundColor : this.props.emptycolor}} >
                    <NxTimeticks
                        scroll_left={this.state.scroll_left}
                        ticks_margins={this.props.ticks_margins}
                        ticks_height={this.props.ticks_height} 
                        ticksDistance={this.props.ticksDistance}
                        isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}
                        width_first_column={this.props.width_first_column}
                        hour_beg={this.props.hour_beg}
                        hour_end={this.props.hour_end} 
                        parentWidth={this.state.container_width}
                        bars_height={this.props.bars_height}
                        visibleHours={this.props.visibleHours}
                        colorMainLine={this.props.colorMainLine}
                        colorThickLine={this.props.colorThickLine}
                        thicknessMainLine={this.props.thicknessMainLine}
                        thicknessHourLine={this.props.thicknessHourLine}
                        thicknessNowLine = {this.props.thicknessNowLine}
                        current_time={this.props.current_time}
                        colorNowLine= {this.props.colorNowLine}
                        appearanceNowLine={this.props.appearanceNowLine}
                        container_height={this.state.container_height}/>
               </div>

               <NxTimeticksNowLine
                    current_time={this.props.current_time}
                    thicknessNowLine = {this.props.thicknessNowLine}
                    parentWidth={this.state.container_width}
                    ticksDistance={this.props.ticksDistance}
                    isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}
                    bars_height={this.props.bars_height}
                    ticks_margins={this.props.ticks_margins}
                    ticks_height={this.props.ticks_height} 
                    hour_beg={this.props.hour_beg}
                    hour_end={this.props.hour_end} 
                    thicknessNowLine={this.props.thicknessNowLine}
                    colorNowLine= {this.props.colorNowLine}
                    appearanceNowLine={this.props.appearanceNowLine}
                    container_height={this.state.container_height}/>

               <div ref={this.containerRef} className={Css.CONTAINER_CLASS } style={{ overflowX: containerOverflowX,backgroundColor: this.props.emptycolor, height : this.props.component_height- this.props.footer_height-this.props.bars_height*2-22}} >
                    <NxTimelineBody
                        ticks_margins={this.props.ticks_margins}
                        ticks_height={this.props.ticks_height} 
                        hour_beg={this.props.hour_beg}
                        row_width={this.getTimeTicksContainerWidth()}
                        ticksDistance={this.props.ticksDistance}
                        onElementSelected={this.handleElementSelected}
                        isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}
                        hour_end={this.props.hour_end} 
                        bars_height={this.props.bars_height}
                        parentWidth={this.state.container_width}
                        visibleHours={this.props.visibleHours}
                        colorMainLine={this.props.colorMainLine}
                        colorThickLine={this.props.colorThickLine}
                        thicknessMainLine={this.props.thicknessMainLine}
                        thicknessHourLine={this.props.thicknessHourLine}
                        current_time={this.props.current_time}
                        thicknessNowLine={this.props.thicknessNowLine}
                        colorNowLine={this.props.colorNowLine}
                        appearanceNowLine={this.props.appearanceNowLine}
                        container_height={this.state.container_height}
                        side_labels_width={this.props.side_labels_width}
                        bottom_labels_width={this.props.bottom_labels_width}
                        width_first_column={this.props.width_first_column}
                        element_color={this.props.element_color}
                        element_labels_color={this.props.element_labels_color}
                        levels={this.props.levels}
                        data={this.props.data}/>
                </div>
                <div className={Css.TIMELINE_BOTTOM_CONTAINER } style={{height : this.props.footer_height, backgroundColor : this.props.emptycolor}}>
                    <div className="nx-timeline-footer-content row" >
                        <div id="currentDate" className="col s12">
                            <div className="nx-current-date">
                             {currentDate}
                            </div>
                        </div>
                        <div className="nx-timeline-footer-actions" >
                            <a id="timeline-button-close" className="nx-timeline-action-button "  onClick={() =>  this.props.onCloseClick()} data-position="bottom" data-delay="50" >
                                
                            </a>
                            <a id="timeline-button-refresh" className="nx-timeline-action-button"  onClick={() =>  this.props.onRefreshClick()} data-position="bottom" data-delay="50" >
                            <svg style={{ width: 25}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    	);
    }
}