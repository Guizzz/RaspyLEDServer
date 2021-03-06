const LedManager = require("../service/ledManager");

module.exports = function (req, res)  
{
    process.env.DEBUG?console.log("SetLed request: [R: "+req.query.red+",G: "+req.query.green+",B: "+req.query.blue+"]"):"";
    try
    {
        jres = LedManager.getInstance().setLed(req.query.red,req.query.green,req.query.blue);
        process.env.DEBUG?console.log(jres):"";
        res.send(jres);
    }
    catch(e)
    {
        console.log("Error: "+e);
        jres = {success:"0", value: {error: e} }
        res.send(jres);
    }
}