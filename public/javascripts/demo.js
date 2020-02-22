class AccessMicButton extends React.Component {
    constructor(props) {
        super(props);
        this.callbacks = {
            handleLeft: props.handleLeft,
            handleRight: props.handleRight,
            handleJump: props.handleJump
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        navigator.permissions.query({name: 'microphone'})
            .then((result) => {
                console.log(`Microphone: ${result.state}`);
                
                if (annyang) {
                    console.log('annyang is ready');

                    let commands = {
                        '*command': (command) => {
                            console.log(`Command: ${command}`)
                            switch(command.charAt(0)) {
                                case 'l':
                                case 'b':
                                    this.callbacks.handleLeft();
                                    break;
                                case 'r':
                                case 'g':
                                    this.callbacks.handleRight();
                                    break;
                                case 'j':
                                case 'u':
                                    this.callbacks.handleJump();
                                    break;
                            }
                        }
                    }

                    annyang.addCommands(commands);
        
                    annyang.start();
                }
            })
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



var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var platforms;
var cursors;
var keyboard = {
    left: { isDown: false, isUp: true },
    right: { isDown: false, isUp: true },
    up: { isDown: false, isUp: true }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);
}

function update ()
{
    console.log(`left: ${keyboard.left.isDown} right: ${keyboard.right.isDown}`)
    if (keyboard.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (keyboard.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (keyboard.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
        keyboard.up.isDown = false;
        keyboard.up.isUp = true;
    }
}

function handleLeft() {
    keyboard.right.isDown = false;
    keyboard.right.isUp = true;
    keyboard.left.isDown = true;
    keyboard.left.isUp = false;
}

function handleRight() {
    keyboard.left.isDown = false;
    keyboard.left.isUp = true;
    keyboard.right.isDown = true;
    keyboard.right.isUp = false;
}

function handleJump() {
    if (player.body.touching.down) {
        keyboard.up.isDown = true;
        keyboard.up.isUp = false;
    }
}

const domContainer = document.querySelector('#root');
const container = (<div>
  <AccessMicButton
    handleJump={handleJump}
    handleLeft={handleLeft}
    handleRight={handleRight}
  />
</div>);
ReactDOM.render(container, domContainer);