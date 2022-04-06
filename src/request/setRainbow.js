const LedManager = require("../service/ledManager");

module.exports = function (req, res)  
{
    process.env.DEBUG?console.log("Set rainbow request at time frequence: "+req.query.time):"";
    try
    {
        jres = LedManager.getInstance().setRainbow(req.query.time);
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