
import React from 'react'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import '../css/daterangepicker.css'

const TimeRangePicker = () =>{
    return (
        <DateRangePicker startDate={moment('1/1/2014')} endDate={moment('3/1/2014')}>
            <div>请选择时间范围!</div>
        </DateRangePicker>
    )
}

export default TimeRangePicker;
