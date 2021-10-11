import NxTimeline from './NxTimeline.js'

export default class NextTimelineClass{

	constructor() {
		this.id = '';
        this.ticks_margins = {left : 150, top : 20, bottom: 20, right : 20};
        this.hour_beg = 0;
        this.hour_end = 24;
        this.bars_height = undefined;
        //defines height of container footer
        this.footer_height = 50;
        //defines Basic Element color
        this.element_color = '#2f416d';
        //defines side labels color 
        this.element_labels_color = '#3c9d9b';
        this.emptycolor ='#FFFFFF';
        //list of hours that will be visibe above corresponding hour thick, set to default(0,3,6,9,12,15,18,21,24)
        this.visibleHours = [];
        //defines color of main line in time ticks bars
        this.colorMainLine = '#e5dfdf';
        //defines color of thicks in time ticks bars
        this.colorThickLine = '#e5dfdf';
        //thickness of the main line
        this.thicknessMainLine = undefined;
        //thickness of the hour line
        this.thicknessHourLine = undefined;
        //defines current time for Now line 
        this.current_time = new Date().getTime();
        //thickness of Now line, values(thin, standard and thin)
        this.thicknessNowLine = '';
        //defines color of Now line
        this.colorNowLine = '#ca3e47';
        //defines appearance of Now line (continuous or dashed)
        this.appearanceNowLine = '';
        //distance between time ticks
        this.thicksDistance = undefined;
        //defines time ticks state ( if it is false ticks distances has default value)
        this.isActiveTimeTicksScroll = true;
        //defines width of Levels container
        this.width_first_column = undefined;
        //defines precentage of side labels (precentage of Basic element width)
        this.side_labels_width = undefined;
        //defines precentage of bottom labels width (precentage of Basic element width)
        this.bottom_labels_width = undefined;
        // on element selected callback
        this.element_click_callbck = null;
        this.refresh_click_callbck = null;
        this.close_click_callbck = null;
        this.displayDate = undefined;
        this.isDraggableLine = false;
        this.parentWidth = 0;
        this.component_height = 400;
        this.currentHour = 0;
        //DATA
        this.json_elements = [];
        this.currentLinePosition = 0;
        this.levels = [];
        this.data = [[]];
    }

    handleElementSelected = (sel_element) => {
        if (this.element_click_callbck){
            this.element_click_callbck(sel_element);
        }
    }

    handleRefreshClick = () => {
        this.refresh_click_callbck();
    }

    handleCloseClick = () => {
        console.log("close");
        
        this.close_click_callbck();
    }
    
    setInitialAndFinalHours = (initalHour, finalHour) => {
        this.hour_beg = initalHour;
        this.hour_end = finalHour;
    }

    setHourLabelVisibility = (hour,visibility) => {
        this.visibleHours[hour] = visibility;
    }

    createNewElement = (new_element) => {
        this.data[new_element.level-1].push(new_element);
        this.updateData();
        this.initDomElem(false);
    }

    removeElement = (sel_element) => {
        let obj_index = this.data[sel_element.level -1].findIndex(item => item.id == sel_element.id);
        if (obj_index != -1){  
            this.data[sel_element.level -1].splice(obj_index, 1);
           
            this.updateData();
            this.initDomElem(false);
        }
    }

    changeCurrentDateTicksDistance = (ticks_distance) => {
        if(ticks_distance == undefined) return;

        this.thicksDistance = ticks_distance;
        this.isActiveTimeTicksScroll = true;
    }

    //this function changes position of child elements when neccessary 
    recalcPositions = (domContainer) => {
        let nowLeft = $('.nx-timeline-now-line').position().left;

        $(domContainer).find(".nx-timeline-container").on( 'scroll', function(){
            let left = $(this).scrollLeft();
            if(left != $('#timeticks-bars').scrollLeft()){
                $('#timeticks-bars').scrollLeft(left);
                $('.nx-timeline-now-line').css({left : nowLeft-left});
            }
        });
        
        $(domContainer).find("#timeticks-hours").find("div").each(function() { 
            //correct position of hours 
            let left_pos = $(this).position().left - Number($(this).css('width').replace("px", "")) / 2;
            $(this).css({left : left_pos});
        });
        
        if(this.isDraggableLine){
            var mainThis = this;
            $('#mainLine').draggable({
                axis: "x",
                drag: function() {
                    let nowLeft = $('.nx-timeline-now-line').position().left;
                    mainThis.getTimeFromPosition(nowLeft);
                }
            });
        }
    }

    changeCurrentDate = (time) => {
        let hour = Math.floor(time);
        let minutes = Math.ceil((time-hour) *60);
        let date = new Date(this.current_time);

        date.setHours(hour);
        date.setMinutes(minutes);
        this.current_time = date.getTime();
        this.initDomElem(false);
    }

    getTimeFromPosition(positionLeft) {
        let hours_cnt = this.hour_end - this.hour_beg + 1; 
        if (hours_cnt < 2)
            return null;
        
        let length = this.parentWidth - this.ticks_margins.left - this.ticks_margins.right;
        if(length < 0)
            return null;

        let offsetA = length / (hours_cnt - 1);
        if(this.isActiveTimeTicksScroll && this.ticksDistance > offsetA) {
            offsetA = this.ticksDistance;
        }
        let time = (positionLeft-this.ticks_margins.left)/offsetA;

        this.changeCurrentDate(time);
    }

    updateData() {
        let data = [];
        for (let i = 0; i < this.data.length; i++) {
            let row_data = [];

            for (let j = 0; j < this.data[i].length; j++) {
                row_data.push(this.data[i][j]);
            }
            data.push(row_data);
        }
        this.data = data;
    }

    updateAllData(){
        let data = [];
        for (let i = 0; i < this.levels.length; i++) {
            let row_data = [];

            for (let j = 0; j < this.json_elements.length; j++) {

                if(this.json_elements[j].level == this.levels[i].id){
                    row_data.push(this.json_elements[j]);
                }
            }
            data.push(row_data);
        }
        this.data = data;
        this.initDomElem(false);
    }

    generateData(){
        let data = [];
        for (let i = 0; i < this.levels.length; i++) {
            let row_data = [];

            for (let j = 0; j < this.json_elements.length; j++) {

                if(this.json_elements[j].level == this.levels[i].id){
                    row_data.push(this.json_elements[j]);
                }
            }
            data.push(row_data);
        }
        this.data = data;
    }

    onChangeParent = (width) =>{
        this.parentWidth = width;
    }

    init() {  
        this.generateData();
        this.initDomElem(true);
    }

    initDomElem(forceRecalc){ 
        var props = {
            title : this.title,   
            ticks_margins : this.ticks_margins,
            hour_beg : this.hour_beg,
            hour_end :this.hour_end, 
            bars_height : this.bars_height,
            visibleHours : this.visibleHours,
            colorMainLine : this.colorMainLine,
            colorThickLine : this.colorThickLine,
            thicknessMainLine : this.thicknessMainLine,
            thicknessHourLine : this.thicknessHourLine,
            ticksDistance : this.thicksDistance,
            isActiveTimeTicksScroll : this.isActiveTimeTicksScroll,
            current_time : this.current_time,
            thicknessNowLine : this.thicknessNowLine,
            colorNowLine : this.colorNowLine,
            appearanceNowLine : this.appearanceNowLine,
            side_labels_width : this.side_labels_width,
            bottom_labels_width : this.bottom_labels_width,
            width_first_column : this.width_first_column,
            element_color : this.element_color,
            element_labels_color : this.element_labels_color,
            component_height : this.component_height,
            emptycolor : this.emptycolor,
            onElementSelected : this.handleElementSelected,
            onRefreshClick : this.handleRefreshClick,
            onCloseClick : this.handleCloseClick,
            footer_height : this.footer_height,
            changeParent : this.onChangeParent,
            data : this.data,
            levels : this.levels,
        };
        
        const domContainer = document.querySelector('#' + this.id);     
        ReactDOM.render(React.createElement(NxTimeline, props), domContainer);

        if (forceRecalc)
           this.recalcPositions(domContainer);
    }
}