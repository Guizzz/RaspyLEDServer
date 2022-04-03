module.exports = function (req, res)  
{
    process.env['DEBUG']?console.log("Ping request"):"";
    res.send('Hello from Raspy Smart LED Server');
}

