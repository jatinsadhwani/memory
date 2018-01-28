import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo />, root);
}

var arrr = [];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    var arr = ['C','A','H','B','B','D','A','E','G','F','C','D','F','E','G','H'];
    for(var i=0;i<16;i++){
      var rand = Math.floor(Math.random() * Math.floor(16));
      var x = arr[i];
      arr[i]=arr[rand];
      arr[rand] = x;
    }
    arrr=arr;
    this.state = {
      count : 0,
      possible : ["","","","","","","","","","","","","","","","",""],
      current_letter : "",
      current_index : "",
      score : 0,
      current_activity : false
    };

    this.buttonClick=this.buttonClick.bind(this);
    this.render = this.render.bind(this);
    this.refresh = this.refresh.bind(this);

  }
  refresh(){
    window.location.reload();
  }
  buttonClick(param){
    var x = param;
    if(this.state.possible[x]=="" && !this.state.current_activity){
      this.state.possible[x]=arrr[x];
      //this.forceUpdate();
        if(this.state.count == 0){
          this.state.possible[x]=arrr[x];
          this.setState({
            count : 1,
            possible : this.state.possible,
            current_letter : arrr[x],
            current_index : x,
            score : this.state.score + 1
        });
        //this.forceUpdate();
        }
        else if(this.state.count==1){
          this.state.possible[x]=arrr[x];
          if(this.state.current_letter == arrr[x]){
            this.state.possible[this.state.current_index]="OK"
            this.state.possible[x]="OK"
            this.setState({
              count : 0,
              possible : this.state.possible,
              current_letter : "",
              current_index : "",
              score : this.state.score + 1
            });

          }
          else{
            this.setState({
              count : this.state.count,
              possible : this.state.possible,
              current_letter : this.state.current_letter,
              current_index : this.state.current_index,
              score : this.state.score + 1,
              current_activity : true
            });
            setTimeout(()=>{
                if(this.state.count==1)
                {
                  var y = this.state.current_index;
                  this.state.possible[y] = "";
                  this.state.possible[x] = "";
                    this.setState({
                      count : 0,
                      possible : this.state.possible,
                      current_letter : "",
                      current_index : "",
                      current_activity : false
                    });
                }
            },1000);
        }
      }
    }
}

  render(){
    return(
      <div className = "Container">
        <div className="row">
          <div className="col-sm-3">
            <Buttons root={this} number = "0" />
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "1" />
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "2" />
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "3" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <Buttons root={this} number = "4"/>
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "5"/>
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "6"/>
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "7"/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <Buttons root={this} number = "8"/>
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "9"/>
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "10"/>
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "11"/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <Buttons root={this} number = "12" />
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "13" />
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "14" />
          </div>
          <div className="col-sm-3">
            <Buttons root={this} number = "15" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <p> Ticks - {this.state.score}</p>
            <Button className="resetButton" onClick={this.refresh}>Reset Game</Button>
          </div>
        </div>

      </div>
    );
  }
}


function Buttons(params){
  let root = params.root;
  var x = parseInt(params.number,10);
  return(<div className="col-sm-3">
    <Button className="normalButton" number = {params.number} onClick={() => root.buttonClick(x)}>{root.state.possible[x]}</Button>
  </div>);
}
