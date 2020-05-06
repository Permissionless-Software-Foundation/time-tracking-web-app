/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import './works-table.css'


class WorksTable extends React.Component {

    constructor(props) {
        super(props)



        this.state = {

            logwork: []

        }

    }

    render() {
        return (
            <table className="works-table">
                <thead>
                    <tr>

                        <th width="15%">Date</th>
                        <th width="10%">User</th>
                        <th width="20%">Project</th>
                        <th width="15%">Type of Work</th>
                        <th width="5%">Hours</th>
                        <th width="30%">Description</th>
                        {this.props.isEditable && <th width="5%">Edit</th>}
                    </tr>

                </thead>
                <tbody>
                    {this.state.logwork.map(val =>
                        <tr valign="middle" key={val._id}>
                            <td width="15%"><p data-toggle="tooltip" data-placement="top" title={val.projectTitle}>{this.parseDate(val.startTime)}</p></td>
                            <td width="10%"><p data-toggle="tooltip" data-placement="top" title={val.user}>{val.user}</p></td>
                            <td width="20%"><p data-toggle="tooltip" data-placement="top" title={val.project}>{val.projectTitle}</p></td>
                            <td width="15%"><p data-toggle="tooltip" data-placement="top" title={val.typeOfWork}>{val.typeOfWork}</p></td>
                            <td width="5%"><p data-toggle="tooltip" data-placement="top" title={val.hours}>{val.hours}</p></td>
                            <td width="30%"><p data-toggle="tooltip" data-placement="top" title={val.details}>{val.details}</p></td>
                            {this.props.isEditable && <td width="5%"><span onClick={() => this.props.editLogWork(val)}><i className="fa fa-pencil-square" aria-hidden="true"></i></span></td>}
                        </tr>

                    )
                    }
                </tbody>
                {this.props.maxPage > 1 &&
                    <tfoot>
                        <tr>
                            <td className="td-paginator">
                                {this.props.currentPage} / {this.props.maxPage}
                            </td>

                            <td className="td-buttons">
                                <div className="buttons-container">
                                    <span id="back" onClick={this.props.back} disabled={this.props.currentPage <= 1}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></span>
                                    <span id="next" onClick={this.props.next} disabled={this.props.currentPage >= this.props.maxPage}><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></span>
                                </div >
                            </td>
                            <td className="td-paginator">
                            </td>

                        </tr>
                    </tfoot>
                }
            </table>

        )
    }


    parseDate(date) {
        const dateString = date && date.toString() ? date.toString() : '';
        return dateString.slice(0, 10);
    }



    componentDidUpdate(prevProps) {


        if (this.props !== prevProps) {

            this.setState({
                logwork: this.props.logworksList
            })
        }

    }


    async componentDidMount() {
        console.log(this.props);
    }

}
WorksTable.propTypes = {
    logworksList: PropTypes.array,
    editLogWork: PropTypes.func,
    isEditable: PropTypes.bool,
    back: PropTypes.func,
    next: PropTypes.func,
    maxPage: PropTypes.number,
    currentPage: PropTypes.number,


}



export default WorksTable