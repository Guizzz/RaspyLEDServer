const LedManager = require("../service/ledManager");

module.exports = function (req, res)  
{
    process.env.DEBUG?console.log("Stop rainbow request"):"";
    try
    {
        jres = LedManager.getInstance().stopRainbow()
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