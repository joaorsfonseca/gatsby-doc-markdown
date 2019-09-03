import React, { Component } from 'react'
import TableOfContents from '../TableOfContents';
import { connect } from 'react-redux'
import { getHeaderHeightState } from "../../store/selectors";

class ResponsiveAnchor extends Component {
  render() {
    const { headerHeight } = this.props
    return (
      <div style={{
      position: "fixed",
      left: "85%",
      right: 10,
      bottom: 0,
      overflow: "hidden",
      top: "3.25rem"
    }} >
      <div style={{
        position:"absolute", 
        left:10,
        right:0,
        top:0,
        bottom:0
      }}>
        <TableOfContents offsetTop={headerHeight+30} affix={true}/>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    headerHeight: getHeaderHeightState(state),
  }
}

export default connect(mapStateToProps) (ResponsiveAnchor)