import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/*
const StyledButton = styled.button`
    font-size: 0.5em;
    margin-right: 0.5em;
`
const StyledButton2 = styled.button`
    font-size: 0.7em;
    margin-left:15px;
    margin-right:15px;

`
*/
const StyledTable = styled.table`
display:block!important;
text-align:center;
padding:1em;
`
const StyledHead = styled.thead`
display:block!important;
text-align:center;
`
const StyledBody = styled.tbody`
display:block!important;
text-align:center;
`
const StyledFoot = styled.tfoot`
display:block!important;
text-align:center;
`
const StyledTr2 = styled.tr`
display:flex!important;

`
const StyledTr = styled.tr`
display:flex!important;
`
const StyledTh = styled.th`
 text-align:center;
`
const StyledP = styled.p`
max-width: 100%;
margin:0 auto;
white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
`
const StyledTd = styled.td`
 display: flex;
 align-items: center;
 justify-content: center;

`
const StyledTdButtons = styled.td`
 display: flex;
 align-items: center;
 margin:0 auto;


`
const StyledButtonIcon = styled.span`
padding: 1em;

`
const StyledTdPaginator = styled.td`
 display: flex;
 font-size: 1.5em;
 font-weight: bold;
 align-items: center;
 margin-left: 10px;


`
const StyledButtonsContainer = styled.div`
 display: flex;
 font-weight: bold;
 align-items: center;
 margin-left: -5%;

 justify-content: center;
`
const StyledIcon = styled.i`
font-size:2em;
cursor:pointer;
`



class WorksTable extends React.Component {

    constructor(props) {
        super(props)



        this.state = {

            logwork: []

        }

    }

    render() {
        return (
            <StyledTable>
                <StyledHead>
                    <StyledTr>

                        <StyledTh width="15%">Date</StyledTh>
                        <StyledTh width="10%">User</StyledTh>
                        <StyledTh width="20%">Project</StyledTh>
                        <StyledTh width="15%">Type of Work</StyledTh>
                        <StyledTh width="5%">Hours</StyledTh>
                        <StyledTh width="30%">Description</StyledTh>
                        {this.props.isEditable && <StyledTh width="5%">Edit</StyledTh>}
                    </StyledTr>

                </StyledHead>
                <StyledBody>
                    {this.state.logwork.map(val =>
                        <StyledTr valign="middle" key={val._id}>
                            <StyledTd width="15%"><StyledP data-toggle="tooltip" data-placement="top" title={val.projectTitle}>{this.parseDate(val.startTime)}</StyledP></StyledTd>
                            <StyledTd width="10%"><StyledP data-toggle="tooltip" data-placement="top" title={val.user}>{val.user}</StyledP></StyledTd>
                            <StyledTd width="20%"><StyledP data-toggle="tooltip" data-placement="top" title={val.project}>{val.projectTitle}</StyledP></StyledTd>
                            <StyledTd width="15%"><StyledP data-toggle="tooltip" data-placement="top" title={val.typeOfWork}>{val.typeOfWork}</StyledP></StyledTd>
                            <StyledTd width="5%"><StyledP data-toggle="tooltip" data-placement="top" title={val.hours}>{val.hours}</StyledP></StyledTd>
                            <StyledTd width="30%"><StyledP data-toggle="tooltip" data-placement="top" title={val.details}>{val.details}</StyledP></StyledTd>
                            {this.props.isEditable && <StyledTd width="5%"><span  onClick={() => this.props.editLogWork(val)}><StyledIcon className="fa fa-pencil-square" aria-hidden="true"></StyledIcon></span></StyledTd>}
                        </StyledTr>

                    )
                    }
                </StyledBody>
                {this.props.maxPage > 1 &&
                    <StyledFoot>
                        <StyledTr2>
                            <StyledTdPaginator>
                                {this.props.currentPage} / {this.props.maxPage}
                            </StyledTdPaginator>

                            <StyledTdButtons>
                                <StyledButtonsContainer>
                                    <StyledButtonIcon  id="back" onClick={this.props.back} disabled={this.props.currentPage <= 1}><StyledIcon className="fa fa-chevron-circle-left" aria-hidden="true"></StyledIcon></StyledButtonIcon>
                                    <StyledButtonIcon  id="next" onClick={this.props.next} disabled={this.props.currentPage >= this.props.maxPage}><StyledIcon className="fa fa-chevron-circle-right" aria-hidden="true"></StyledIcon></StyledButtonIcon>
                                </StyledButtonsContainer>
                            </StyledTdButtons>
                            <StyledTdPaginator>
                            </StyledTdPaginator>

                        </StyledTr2>
                    </StyledFoot>
                }
            </StyledTable>

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