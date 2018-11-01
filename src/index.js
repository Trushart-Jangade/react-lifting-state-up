import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
  }

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
// It returns an empty string on an invalid temperature, 
// and it keeps the output rounded to the third decimal place:
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }
  class TemperatureInput extends React.Component {
    //   currently it is in local state.
    //  we will LIFT its STATE UP to calculator
      constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
        //   this.state = { temperature: ''};
      }
      handleChange(e) {
        //   this.setState({ temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
      }
      render() {
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
          const scale = this.props.scale;
          return (
            <fieldset>
                <legend>Enter Temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange}/>
            </fieldset>
          );
      }
  }
  
  class Calculator extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.handleChange = this.handleChange.bind(this);
    //   this.state = {temperature: ''};
    // }
  
    // handleChange(e) {
    //   this.setState({temperature: e.target.value});
    // }
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }
    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }
    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }
    render() {
    //   const temperature = this.state.temperature;
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
      return (
          <div>
                <TemperatureInput 
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                    />
                <TemperatureInput 
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                 <BoilingVerdict
            celsius={parseFloat(temperature)} />
          </div>
        // <fieldset>
        //   <legend>Enter temperature in Celsius:</legend>
        //   <input
        //     value={temperature}
        //     onChange={this.handleChange} />
  
        //   <BoilingVerdict
        //     celsius={parseFloat(temperature)} />
  
        // </fieldset>
      );
    }
  }

ReactDOM.render(<Calculator />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
