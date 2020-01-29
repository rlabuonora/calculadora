import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ResultDisplay extends Component {
    render () {
        return (
                <p id="result">
                { this.props.result }
                </p>
               );
    }
}

class ExpressionDisplay extends Component {
    render () {
        return (
                <p id="expression">
                { this.props.expression }
                </p>);
    }
}

class Screen extends Component {
    render() {
        return(
            <div id="screen">
                <ResultDisplay  result={this.props.result}/>
                <ExpressionDisplay expression={this.props.expression}/>
            </div>
        );
    }
}

class Button extends Component {

    label(s) {
        if (s === "equal") return "=";
        if (s === "zero") return "0";
        if (s === "dot") return ".";
        else return s;        
    }
    render() {
        var label = this.label(this.props.value);
        return(
                <div className="btn"
                  onClick={() => this.props.onClick(label)}
                  id={this.props.value} >
                { label }
                </div>
        );
    }
}

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            expression : "0",
            result : "0",
            state: this.clear.bind(this)
        }
    }

    clear(s) {
        if (/[+\-]/.test(s) || isDigit(s)) {
          this.appendExpr(s);
          this.setState( { state: this.enterInteger.bind(this) });
        }
    }

    enterInteger(s) {
        if (isDigit(s)) {
          this.appendExpr(s);
        }
        else if (isOperand(s)) {
            this.appendExpr(s);
            this.setState( { state: this.enterOperand.bind(this) });
        }
        else if (s === ".") {
            this.appendExpr(s);
            this.setState( { state: this.enterDecimal.bind(this) });
        }
        else if (s === "=") {
            this.evalCurrentExp();
        }
        else if (s === "CE") {
            this.removeLastChar();
        }
    }

    enterDecimal(s) {
        if (isDigit(s)) {
            this.appendExpr(s);
        }
        else if (isOperand(s)) {
            this.setState( { state: this.enterOperand.bind(this) });
        }
        else if (s === "=") {
            this.evalCurrentExp();
            this.reset();
        }
        else if (s === "CE") {
            this.removeLastChar();
        }
    }

    enterOperand(s) {
        if (/[*\/]/.test(s)) {
            this.overwriteLastChar(s);
        }
        else if (s === "=") {
            this.evalCurrentExp();
            this.reset();
        }
        else if (s === "CE") {
            this.removeLastChar();
        }
        else { // must be [0-9] or + -
            this.appendExpr(s);
            this.setState( { state: this.enterInteger.bind(this) });
        }
        
        
    }

    format(n) {
        // TODO make sure result has at most 10 digits
        return n;
    }
    
    reset() {
        this.setState( {
            expression: "0",
            result: "0",
            state: this.clear.bind(this)
        })
    }

    removeLastChar() {
        var temp = this.state.expression.slice(0, -1) ;
        this.setState({ expression: temp });
    }

    overwriteLastChar(s) {
        var temp = this.state.expression.slice(0, -1) + s;
        this.setState({ expression: temp });
    }
    
    evalCurrentExp() {
        var result = this.format(eval(this.state.expression));
        this.setState({
                        expression: "0",
                        result: result,
                        state: this.clear.bind(this)
                      })
    }
    appendExpr(s) {
        // TODO: go to error mode if more than 22 chars
        var temp = this.state.expression.slice();
        if (temp.length > 11) return;
        if ( (s=== "+" || s ==="-") && s === temp.slice(-1)) return;
        temp = temp === "0" ? "" : temp
        temp += s;
        this.setState({ expression: temp });
    }
    
    handleClick(s) {
        if (s === "AC") {
           this.reset()
        } 
        else {
            this.state.state(s);
        }
    }
    render() {
        return (
                <div id="calculator">
                <Screen id="screen"
                       expression={this.state.expression}
                       result={this.state.result}
                 />
                <Button value={"AC"} onClick={this.handleClick.bind(this)} />
                <Button value={"CE"} onClick={this.handleClick.bind(this)} />
                <Button value={"/"} onClick={this.handleClick.bind(this)} />
                <Button value={"*"} onClick={this.handleClick.bind(this)} />
                <Button value={"7"} onClick={this.handleClick.bind(this)} />
                <Button value={"8"} onClick={this.handleClick.bind(this)} />
                <Button value={"9"} onClick={this.handleClick.bind(this)} />
                <Button value={"-"} onClick={this.handleClick.bind(this)} />
                <Button value={"4"} onClick={this.handleClick.bind(this)} />
                <Button value={"5"} onClick={this.handleClick.bind(this)} />
                <Button value={"6"} onClick={this.handleClick.bind(this)} />
                <Button value={"+"} onClick={this.handleClick.bind(this)} />
                <Button value={"1"} onClick={this.handleClick.bind(this)} />
                <Button value={"2"} onClick={this.handleClick.bind(this)} />
                <Button value={"3"} onClick={this.handleClick.bind(this)} />
                <Button value={"equal"} onClick={this.handleClick.bind(this)} />
                <Button value={"zero"} onClick={this.handleClick.bind(this)} />
                <Button value={"dot"} onClick={this.handleClick.bind(this)} />
                </div>
        );
    }
}


class App extends Component {
  render() {
    return (
      <div className="App">
            <Calculator />
            <p className="credit">
            <a href="http://rlabuonora.com"> Rafael La Buonora </a>

            <a href="https://github.com/rlabuonora/calculadora" target="_blank">
              (Github)
        </a>
            </p>
      </div>
    );
  }
}



// regex wrappers
function isOperand(s) {
    return /[+\-*\/]/.test(s);
}

function isDigit(s) {
    return /[0-9]/.test(s);
}

export default App;
