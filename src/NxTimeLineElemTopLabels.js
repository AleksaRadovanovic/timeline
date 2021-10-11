import {Css} from './NxTimelineConsts.js'
import NxTimeLineElemLabel from './NxTimeLineElemLabel.js'

export default class NxTimeLineElemTopLabels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {}
   
    getStyle = () => {

        let style={
            marginLeft: this.props.marginLeft,
            marginTop: this.props.marginTop,
         };
 
         return style;
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
        let labels = [];

        labels.push(this.renderLabel(this.props.labelsWidth - 3, -10, 0, labels_data.left_label, 0));
        labels.push(this.renderLabel(this.props.labelsWidth - 3, 5, 0, labels_data.right_label, 1));

        return labels;
    } 

    render() {        
        let labels = this.renderLabels();
        
        return (
            <div className={"nx-timeline-top-labels topLabels" + this.props.labelID}  style={this.getStyle()}>
              {labels}
            </div>
        );
    }
}