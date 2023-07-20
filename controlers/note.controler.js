const resmodel = require("../models/register")

const addnoteControler = async (req,res) => {
    try {
        const newNote = {
            myid: req.body.myid,
            noteTittle: req.body.noteTittle,
            noteText: req.body.noteText,
            createTime: req.body.createTime
        }
        const data = await resmodel.updateOne({_id: req.body.myid},{
            $push: {
                note: newNote
            }
        })
        
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports = addnoteControler