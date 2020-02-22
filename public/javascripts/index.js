'use strict';

const e = React.createElement;

class TestButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.testHandler = this.testHandler.bind(this);
  }

  handleClick(e) {
    navigator.permissions.query({name: 'microphone'})
      .then((result) => {
        console.log(`Result: ${result.state}`);
        if (annyang) {
          console.log("READY");
                
          let commands = {
            'run *dir': (dir) => {    
              let div = document.createElement('div');
              div.appendChild(document.createTextNode(`RUNNING ${dir}`));
              document
                .getElementById('display')
                .appendChild(div);
            },
            'jump *dir': (dir) => {
              let div = document.createElement('div');
              div.appendChild(document.createTextNode(`JUMPING ${dir}`));
              document
                .getElementById('display')
                .appendChild(div);
            },
            'jump': () => {
              let div = document.createElement('div');
              div.appendChild(document.createTextNode(`JUMPED`));
              document
                .getElementById('display')
                .appendChild(div);
            }
          }
        
          annyang.addCommands(commands);
        
          annyang.start();
        }

          
      })
  }

  testHandler(e) {
    console.log('Test handler');
  } 


  render() {
      return (
        <button
          onClick={this.handleClick}
        >
          Turn on Mic
        </button>
      );
  }
}

const domContainer = document.querySelector('#root');
const container = (<div>
  <TestButton/>
</div>);
ReactDOM.render(container, domContainer);

