import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Report from '../components/Report'
import * as report from '../state/action'

const mapStateToProps = (state) => {
  return {
    reportVote: state.home.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(report, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
