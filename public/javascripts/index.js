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

    
        navigator.mediaDevices.getUserMedia({ audio: true, video: false})
          .then((mediaStream) => {
            console.log('Microphone on @@@')
            
            const downloadLink = document.getElementById('download');
            const recordedChunks = [];
            const mediaRecorder = new MediaRecorder(mediaStream, {mimeType: 'audio/webm'});

            mediaRecorder.addEventListener('dataavailable', function(e) {
              if (e.data.size > 0) {
                recordedChunks.push(e.data);
              }
            });

            mediaRecorder.addEventListener('stop', function() {
              console.log("stop() called!")
              downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
              downloadLink.download = 'acetest.mp3';
            });
            
            mediaRecorder.start();

            window.setTimeout(() => {
              console.log("TIMEOUT FUNCTION CALLED!");
              mediaRecorder.stop();
            }, 3000) ;
          })

          
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