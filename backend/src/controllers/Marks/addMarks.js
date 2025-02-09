const db = require("../../config/db");

const addMarks = (req,res) =>{
    const  {subject1, subject2,subject3,subject4,subject5} = req.body;

    const query = `INSERT INTO marks(student_1,student_2 , student_3, student_4,student_5)
    VALUES(?,?,?,?,?)`;

    db.query(query,[subject1,subject2,subject3,subject4,subject5] , (err, result)=>{
        if(err)
        {
           console.log("Error adding marks",err);
           return res.status(500).json({message : "failed to add marks"});
        }
        res.status(200).json({message : "Marks added successfully"});

    })
}
module.exports ={addMarks};
