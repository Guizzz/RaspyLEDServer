const LedManager = require("../service/ledManager");

module.exports = function (req, res)  
{
    process.env.DEBUG?console.log("Set rainbow brightness: "+req.query.brightness):"";
    try
    {
        jres = LedManager.getInstance().setRainbowBrightness(req.query.brightness);
        process.env.DEBUG?console.log(jres):"";
        res.send(jres);
    }
    catch(e)
    {
        console.error("Error: "+e);
        jres = {success:"0", value: {error: e} }
        res.send(jres);
    }
}