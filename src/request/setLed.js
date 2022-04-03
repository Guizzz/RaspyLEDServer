const LedManager = require("../service/ledManager");

module.exports = function (req, res)  
{
    process.env.DEBUG?("SetLed request: [R: "+req.query.red+",G: "+req.query.green+",B: "+req.query.blue+"]"):"";
    try
    {
        LedManager.getInstance().setLed(req.query.red,req.query.green,req.query.blue);
        jres = {success:"1", value: {red: req.query.red, green: req.query.green, blue: req.query.blue} }
        res.send(jres);
    }
    catch(e)
    {
        console.log("Error: "+e);
        jres = {success:"0", value: {error: e} }
        res.send(jres);
    }
}