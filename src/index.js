import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.css';
import 'whatwg-fetch'

function Square(props) {
  //https://facebook.github.io/react/docs/conditional-rendering.html
  const isChecked = props.value;
  if (isChecked){
    return (
      <button className="square active" onClick={props.onClick}>
      </button>
    )
  }else{
    return (
      <button className="square" onClick={props.onClick}>
      </button>
    )
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            styleName={""}
            />
        );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div className="board-row">
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
        </div>
        <div className="board-row">
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  componentDidMount() {
    fetch('/squares')
      .then(res => res.json())
      .then(squares => this.setState({ squares }));

    fetch('/tasks')
      .then(res => res.json())
      .then(tasks => this.setState({ tasks }));
  };

  constructor() {
    super();
    var squares_1 = Array(40).fill(null);
    var tasks_1 = [];
    this.state = {
      stepNumber: 0,
      showModal: false,
      squareID: -1,
      tasks: tasks_1,
      squares: squares_1
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({
      squares: squares,
      squareID: i,
      showModal: true
    });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const tasks = this.state.tasks.slice();
    this.setState({
        showModal: false,
        tasks: tasks.concat([
          {id: tasks.length, timestamp: Date.now(), description: this.input.value, square: this.state.squareID}
        ])
    }, function(){
        fetch('http://localhost:3001/squares', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify(this.state.squares)
        });

        fetch('http://localhost:3001/tasks', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify(this.state.tasks)
        });

    });
    console.log("squares",this.state.squares);
    console.log("tasks",this.state.tasks);
  }


  render() {
    const tasks = this.state.tasks;
    const squares = this.state.squares.slice();

    const tasks_const = tasks.map((task, index) => {
      console.log(task);
      return (
        <li key={index}>
          {task.description}
        </li>
      );
    });

    let status;
    status = 'Completed tasks: ';

    return (
      <div className="base">
        <div className="title">
          <h1>Project: create a project tracker</h1>
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{tasks_const}</ol>
          </div>
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="Minimal Modal Example">
             <div className="form">
               <form onSubmit={this.handleSubmit}>
                 <label>
                   Name:
                   <input type="text" ref={(input) => this.input = input} />
                 </label>
                 <input type="submit" value="Submit" />
               </form>
             </div>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
