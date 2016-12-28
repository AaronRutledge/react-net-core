import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import QuoteList from '../components/QuoteList'
import {requestIndex} from '../actions/MarkitActions'

class Stock extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      enteredSymbol: props.symbol
    };
    this.onClickQuote = this.onClickQuote.bind(this);
    this.handleSymbolUpdate = this.handleSymbolUpdate.bind(this);
  }

  componentWillMount() {
    this.props.requestIndex(this.props.symbol);
  }

  onClickQuote() {
    this.props.requestIndex(this.state.enteredSymbol);
  }

  handleSymbolUpdate(e) {
    this.setState({enteredSymbol: e.target.value});
  }

  render () {

    const { symbol } = this.props;
    return (
      <div>
        <input type="text" onChange={this.handleSymbolUpdate}/>
         <button onClick={this.onClickQuote} label="Make Quote Call" />
        <h1>{symbol}</h1>
        <QuoteList quote={this.props.quote}/>
      </div>
    );
  }
}

Stock.propTypes = {
  // symbol: PropTypes.string.isRequired,
  // quote: PropTypes.object.isRequired,
  // requestQuote: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    companyProfile: state.markitData.companyProfile,
    dividends: state.markitData.dividends,
    quote: state.markitData.quote,
    symbol: state.markitData.symbol,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestIndex: (symbol) => dispatch(requestIndex(symbol))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
