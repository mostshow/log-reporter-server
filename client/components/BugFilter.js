
import React from 'react'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import Select from 'react-select';


import styles from '../css/bugFilter.css'



class BugFilter extends React.Component {

    constructor(props){
        super(props)

        this.state = {
			startDate: moment().subtract(29, 'days'),
            endDate: moment().subtract(-1, 'days'),
            keyword:'',
            selectValue:''
        }

        this.handleBlur = this.handleBlur.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
        this.updateValue = this.updateValue.bind(this)
    }

    handleBlur(filterParam){
		this.setState({
			keyword: this.refs.keyword.value,
		});
    }
	handleEvent(event, picker) {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		});
	}

    updateValue(newValue){
        if(newValue){
            this.setState({
                selectValue: newValue.value
            });
        }else{
            this.setState({
                selectValue: ''
            });
        }
    }
    render(){
        let start = this.state.startDate.format('YYYY-MM-DD');
        let end = this.state.endDate.format('YYYY-MM-DD');
        let label = start + ' - ' + end;

        let options = [
            { value: 'ip', label: 'IP' },
            { value: 'env', label: 'Env' },
            { value: 'level', label: 'Level' },
            { value: 'msg', label: 'Message' },
            { value: 'referer', label: 'Referer' },
            { value: 'resolution', label: 'Resolution' },
            { value: 'sourceFile', label: 'Source-File' },
            { value: 'type', label: 'Type' },
            { value: 'userAgent', label: 'UA' }
        ];
        let search = this.props.search
        return (
            <div className={styles.formGroup}>
                <div className="col-md-4">
                    <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate}  onEvent={this.handleEvent}>
                        <span>
                            <input type="text" className="form-control input-group-lg" value={label} placeholder="Please enter keyword" />
                        </span>
                    </DateRangePicker>
                </div>
                <div className="col-md-3">
                    <Select
                        name="form-field-name"
                        value={this.state.selectValue}
                        options={options}
                        onChange={this.updateValue}
                    />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control input-group-lg" ref="keyword"  onBlur={this.handleBlur} placeholder="" />
                </div>
                <div className="col-md-1">
                    <button className="btn btn-primary" onClick={search.bind(this,this.state)} >Search</button>
                </div>
                <div className="col-md-1">
                    <button className="btn btn-default" >Reset</button>
                </div>
            </div>
            )
    }

}

export default BugFilter;
