
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ReactPaginate from 'react-paginate'

import BugView from './BugView'
import BugFilter from './BugFilter'

import { parseSourceMap, logRequest } from '../actions/logActions'

class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.handleParseSourceMap = this.handleParseSourceMap.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            pageSize: 10,
			startDate: moment().subtract(29, 'days').format('YYYY-MM-DD'),
            endDate: moment().subtract(-1, 'days').format('YYYY-MM-DD'),
            keyword:'',
            selectValue:'',
            curPage:0
        }

    }

    componentDidMount() {
        this.props.logRequest(this.state)
    }
    handleParseSourceMap(logData){
        this.props.parseSourceMap({
            row:logData.row,
            col:logData.col,
            sourceMapSrc:logData.sourceFile + '.map'
        }).then((res) => {
            if (res.status == 200 && res.data) {
                if (res.data.code == 0) {
                    var str = '文件名: ' + res.data.result.source + '\n';
                    str += '行号: ' + res.data.result.line + '\n';
                    str += '变量名: ' + res.data.result.name + '\n';
                    alert(str);
                } else {
                    alert( 'request file error!');
                }
            } else {
                console.error(res);
            }
        },(err) => {
            console.error(err);
        })
    }
    componentDidUpdate(){
    }
    handlePageClick(obj){
        let state = {
            curPage:obj.selected
        }
        this.setState(state,() =>{
            this.props.logRequest(this.state)
        })
    }

    search(param){
        let state = {
			startDate: param.startDate.format('YYYY-MM-DD') || '',
            endDate: param.endDate.format('YYYY-MM-DD') || '',
            keyword:param.keyword || '',
            selectValue:param.selectValue || '',
            curPage:0
        }
        this.setState(state, () =>{
            this.props.logRequest(this.state)
        })
    }

    render(){
        const Log = this.props.logList.data.map(log =>
        <BugView  key={log._id} log={log} handleParseSourceMap = {this.handleParseSourceMap}  />
        )
        const pageCount = Math.ceil(this.props.logList.total/this.state.pageSize);
        return (
        <div>
            <BugFilter search={this.search}/>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-md-1">Time</th>
                        <th className="col-md-1">Env</th>
                        <th className="col-md-1">Level</th>
                        <th className="col-md-1">Type</th>
                        <th className="col-md-1">IP</th>
                        <th className="col-md-1">Resolution</th>
                        <th className="col-md-1">Referer</th>
                        <th className="col-md-1">Source-File</th>
                        <th className="col-md-3">Message</th>
                        <th className="col-md-1">UA</th>
                    </tr>
                </thead>
                <tbody>
                    {Log}
                </tbody>
            </table>
            <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                forcePage = {this.state.curPage}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        logList: state.logList
    }
}

BugList.propTypes = {
    logRequest: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps,{parseSourceMap, logRequest})(BugList)
