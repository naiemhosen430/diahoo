const resmodel = require("../models/register")

const mynoteControler = async (req,res) => {
    try {
        const mycallaction = await resmodel.findOne({_id: req.query.myid})
        const myNote = mycallaction.note
        res.send(myNote)
    } catch (error) {
        console.log(error)
    }
}

module.exports= mynoteControler