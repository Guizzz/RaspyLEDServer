var Gpio = require('pigpio').Gpio;


class PrivateSingleton {

    constructor() {
        this.RedLed = new Gpio(4, {mode: Gpio.OUTPUT});
        this.GreenLed = new Gpio(17, {mode: Gpio.OUTPUT});
        this.BlueLed = new Gpio(18, {mode: Gpio.OUTPUT});

        this.redValue=0;
        this.greenValue=0;
        this.blueValue=0;

        this.RedLed.pwmWrite(parseInt(this.redValue,10));
        this.GreenLed.pwmWrite(parseInt(this.greenValue,10));
        this.BlueLed.pwmWrite(parseInt(this.blueValue,10));
    }

    setLed(r,g,b)
    {
        this.redValue= r != undefined ? r : this.redValue;
        this.greenValue= g != undefined ? g : this.greenValue;
        this.blueValue= b != undefined ? b : this.blueValue;

        this.RedLed.pwmWrite(parseInt(this.redValue,10));
        this.GreenLed.pwmWrite(parseInt(this.greenValue,10));
        this.BlueLed.pwmWrite(parseInt(this.blueValue,10));
    }

    getStatus()
    {
        return(
            {
                red:this.redValue,
                green:this.greenValue,
                blue:this.blueValue,
            }
        )
    }
}

class LedManager {
    constructor() {
        throw new Error('Use LedManager.getInstance()');
    }    
    
    static getInstance() 
    {
        if (!LedManager.instance) {
            LedManager.instance = new PrivateSingleton();
        }
        return LedManager.instance;
    }
}

module.exports = LedManager;
