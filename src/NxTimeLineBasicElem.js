import {Css} from './NxTimelineConsts.js'
import NxTimelineBar from './NxTimelineBar.js'
import NxTimeLineElemLabel from './NxTimeLineElemLabel.js'
import NxTimeLineElemBottomLabels from './NxTimeLineElemBottomLabels.js'
import NxTimeLineElemTopLabels from './NxTimeLineElemTopLabels.js'

export default class NxTimeLineBasicElem extends React.Component {
    constructor(props) {
        super(props);
        this.rootRef = React.createRef();
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {}
   
    getBarStyle = () => {
       let data = this.props.bar_data;
       let style={
            marginLeft: data.marginLeft + 6.5,
            maxWidth: data.width,
            width: data.width,
            btmLabelsMarginTop: 0,
        };

        return style;
    }

    handleClick = () => {
        this.props.onElementSelected(this.props.bar_data)
    }

    renderBar = () => {
        let data = this.props.bar_data;
        let bar_data = {width: data.width - 2 * data.sideTextWitdh, innerHtml: data.innerHtml};
        let marginLeft = data.sideTextWitdh;
        return (
                <NxTimelineBar
                    bar_data={bar_data}
                    element_color={data.color}
                    marginLeft={marginLeft}
                    />
        );
    }

    renderLeftSideLabel = (id) => {

     /*   if(!this.props.bar_data.left_side_label.show) 
            return null;
*/
        let data = this.props.bar_data;
        let sideLabelsWidth = data.sideTextWitdh-11;
        return (
                <NxTimeLineElemLabel 
                    labelWidth={sideLabelsWidth}
                    labelMarginLeft={0}
                    labelMarginRight={5}
                    label_data={data.left_side_label}
                    labelColor={this.props.element_labels_color}
                    key={id}
                    isSelected={this.props.isSelected}/>
        );
    }

    renderRightSideLabel = (id) => {

        let data = this.props.bar_data;
        let sideLabelsWidth = data.sideTextWitdh-11;
        return (
                <NxTimeLineElemLabel 
                    labelWidth={sideLabelsWidth}
                    handleLabelWidth={this.handleLabelWidth}
                    labelMarginLeft={5}
                    label_data={data.right_side_label}
                    labelColor={this.props.element_labels_color}
                    key={id}
                    isSelected={this.props.isSelected}/>
        );
    }

    renderBottomLabels = (data,width,marginLeft,index) => {
        return (
                <NxTimeLineElemBottomLabels 
                    
                    labels_data={data}
                    labelColor={this.props.element_labels_color}
                    width={width}
                    bottom_labels_width={this.props.bottom_labels_width}
                    marginLeft={marginLeft}
                    isSelected={this.props.isSelected}
                    elementStartPosition={this.props.bar_data.startPosition}
                    parentWidth={this.props.parentWidth}
                    ticks_margins={this.props.ticks_margins}
                    ticksDistance={this.props.ticksDistance}
                    isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}
                    hour_beg={this.props.hour_beg}
                    hour_end={this.props.hour_end}
                    key={index}
                    labelID={index}/>
        );
    }

    renderAllBottomLabels = () => {
        let data = this.props.bar_data;

        let byRectangleWidth =  data.width - 2 * data.sideTextWitdh;
        let sideLabelsWidth = data.sideTextWitdh;
        let bottomTexts = data.bottomTexts;
        let labels = [];

        if(bottomTexts != undefined && bottomTexts != null){
            //generate bottom labels
            labels.push(this.renderBottomLabels(data.bottomTexts, byRectangleWidth, sideLabelsWidth, 4));
        }

        return labels;
    }

    renderTopLabels = (data,width,marginLeft,index) => {
        return (
                <NxTimeLineElemTopLabels 
                    labelsWidth={width}
                    marginLeft={0}
                    labels_data={data}
                    labelColor={this.props.element_labels_color}
                    key={index}
                    labelID={index}
                    isSelected={this.props.isSelected}/>
        );
    }

    renderAllTopLabels = () => {
        let data = this.props.bar_data;

        let byRectangleWidth =  data.width - 2 * data.sideTextWitdh;
        let sideLabelsWidth = data.sideTextWitdh;
        
        //let topLabelsWidth = byRectangleWidth*(this.props.labels_width/100) - 5;
        let topLabelsWidth = sideLabelsWidth;
        let labels_data = { left_label : data.top_left_label, right_label : data.top_right_label};

        let labels = [];

        labels.push(this.renderTopLabels(labels_data, topLabelsWidth, sideLabelsWidth, 4));

        return labels;
    }

    renderAllBottomLabels = () => {
        let data = this.props.bar_data;

        let byRectangleWidth =  data.width - 2 * data.sideTextWitdh;
        let sideLabelsWidth = data.sideTextWitdh;
        let labels = [];

        //generate bottom labels
        labels.push(this.renderBottomLabels(data.bottomTexts, byRectangleWidth - 10, sideLabelsWidth + 5, 4));

        return labels;
    }
    render() {        
        let bar = this.renderBar();
        let leftSideLabel = this.renderLeftSideLabel(0);
        let rightSideLabel = this.renderRightSideLabel(1);

        return (
            <div ref={this.rootRef} className={Css.TIMELINE_BASIC_ELEM} style={this.getBarStyle()} onClick={() => this.handleClick()}  >
               <div className="frame">
                  {this.renderAllTopLabels()}
               </div>
               <div className={Css.TIMELINE_BASIC_ELEM_ROW_FRAME+" frame"}>
                   {leftSideLabel}
                   {bar}
                   {rightSideLabel}
               </div>
               <div className="nx-timeline-bottom-labels-container">
                   {this.renderAllBottomLabels()}
               </div>
            </div>
        );
    }
}