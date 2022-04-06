module.exports = function (req, res)  
{
    process.env['DEBUG']?console.log("Ping request"):"";
    res.send({success:1,value:'Hello from Raspy Smart LED Server'});
}

