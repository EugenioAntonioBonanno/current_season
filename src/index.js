import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'



class App extends React.Component {

  state = {  lat: null, lon:'', errorMessage: '' }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // ALWAYS USE SET STATE
        this.setState({ lat: position.coords.latitude })
        // this.setState( { long: position.coords.longitude})
      },
      (err) => {
        this.setState({ errorMessage: err.message })
      }
    );
  }

  componentDidUpdate() {
    console.log('component was updated- it rerendered')
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    } else if ( !this.state.errorMessage && this.state.lat ) {
      return <SeasonDisplay lat={this.state.lat} />;
    } else {
      return <Spinner message='Please accept location request'/>;
    }
  }

  render() {
    return (
      <div className='border red '>
        {this.renderContent()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))