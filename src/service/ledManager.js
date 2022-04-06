var Gpio = require('pigpio').Gpio;

class PrivateSingleton {

    constructor() {
        this.RedLed = new Gpio(4, {mode: Gpio.OUTPUT});
        this.GreenLed = new Gpio(17, {mode: Gpio.OUTPUT});
        this.BlueLed = new Gpio(18, {mode: Gpio.OUTPUT});

        this.redValue=0;
        this.greenValue=0;
        this.blueValue=0;
        this.rainbowRunning=false;
        this.time=40;
        this.rainbowBrightness=255;

        this.RedLed.pwmWrite(parseInt(this.redValue,10));
        this.GreenLed.pwmWrite(parseInt(this.greenValue,10));
        this.BlueLed.pwmWrite(parseInt(this.blueValue,10));
    }

    sleep(millis) 
    {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    setLed(r,g,b)
    {

        if(this.rainbowRunning) return ({success:0, error: "Rainbow is running"});

        this.redValue= r != undefined ? r : this.redValue;
        this.greenValue= g != undefined ? g : this.greenValue;
        this.blueValue= b != undefined ? b : this.blueValue;

        this.RedLed.pwmWrite(parseInt(this.redValue,10));
        this.GreenLed.pwmWrite(parseInt(this.greenValue,10));
        this.BlueLed.pwmWrite(parseInt(this.blueValue,10));

        return ({success:1, value:{red: this.redValue, green: this.greenValue, blue: this.blueValue}});
    }

    getStatus()
    {
        return(
            {
                success : 1,
                red : this.redValue,
                green : this.greenValue,
                blue : this.blueValue,

                rainbowStatus:
                {
                    rainbowRunning : this.rainbowRunning,
                    rainbowBrightness : this.rainbowBrightness,
                    time : this.time
                }
            }
        )
    }

    setRainbowBrightness(brightnesVal)
    {
        if(brightnesVal<0) return ({success:0, error:"Brightness value < 0"});
        if(brightnesVal>255) return ({success:0, error:"Brightness value > 255"});
        this.rainbowBrightness=brightnesVal;
        return ({success:1, value:{brightnesVallue:this.rainbowBrightness}})
    }

    setRainbow(time)
    {
        if(this.rainbowRunning) return  ({success:0, error:"Rainbow already running"});
        if(time==undefined) return  ({success:0, error:"Time delay is undefined"});
        if(time<10) return ({success:0, error:"Time frequence is too high"});  

        this.time=time;
        this.rainbowRunning=true;

        this.startRainbow();

        return({success:1});
    }
    
    async startRainbow()
    {
        for(; this.redValue<this.rainbowBrightness; this.redValue++)
        {
            this.RedLed.pwmWrite(parseInt(this.redValue,10));
            await this.sleep(this.time);
        }

        while(this.rainbowRunning)
        {
            for(; this.greenValue<this.rainbowBrightness && this.rainbowRunning; this.greenValue++)
            {
                this.GreenLed.pwmWrite(parseInt(this.greenValue,10));
                await this.sleep(this.time);
            }
            
            for(; this.redValue>0 && this.rainbowRunning; this.redValue--)
            {
                this.RedLed.pwmWrite(parseInt(this.redValue,10));
                await this.sleep(this.time);
            }

            for(; this.blueValue<this.rainbowBrightness && this.rainbowRunning; this.blueValue++)
            {
                this.BlueLed.pwmWrite(parseInt(this.blueValue,10));
                await this.sleep(this.time);
            }

            for(; this.greenValue>0 && this.rainbowRunning; this.greenValue--)
            {
                this.GreenLed.pwmWrite(parseInt(this.greenValue,10));
                await this.sleep(this.time);
            }

            for(; this.redValue<this.rainbowBrightness && this.rainbowRunning; this.redValue++)
            {
                this.RedLed.pwmWrite(parseInt(this.redValue,10));
                await this.sleep(this.time);
            }

            for(; this.blueValue>0 && this.rainbowRunning; this.blueValue--)
            {
                this.BlueLed.pwmWrite(parseInt(this.blueValue,10));
                await this.sleep(this.time);
            }
        }

        for(var i=255; i>0 ; i--)
        {
            if(this.redValue>0)   this.RedLed.pwmWrite(parseInt(this.redValue--,10));
            if(this.greenValue>0) this.GreenLed.pwmWrite(parseInt(this.greenValue--,10));
            if(this.blueValue>0)  this.BlueLed.pwmWrite(parseInt(this.blueValue--,10));
            await this.sleep(parseInt(this.time/2, 10));
        }
    }

    stopRainbow()
    {
        this.rainbowRunning=false;
        return ({success:1})
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
