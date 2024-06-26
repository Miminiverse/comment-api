const OTodo = require('../models/OTodo')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require("../errors")


const getAllOTodos = async (req,res) => {
    if (req.user){
    }
    const Otodos = await OTodo.find({}).sort({createdAt: -1})
    res.status(StatusCodes.OK).json({Otodos})
}


const getOTodo = async (req,res) => {
  
    const Otodo = await OTodo.findOne({
        _id: req.params.id,
    })
    if (!Otodo) {
        throw new NotFoundError(`No todo with id`)
    }
    res.status(StatusCodes.OK).json({Otodo})
}


const createOTodo = async (req,res) => {
    if (req.user) {
    }
    req.body.createdBy = req.user._id
    const Otodo = await OTodo.create(req.body)
    res.status(StatusCodes.CREATED).json({Otodo})
}

// const updateTodo = async (req,res) => {
//     const {
//         body:  {title, content}, 
//         user: {userId}, 
//         params:{id: todoId},
//     } = req

//     if (title === "" || content === "") {
//         throw new BadRequestError("Title or Content can not be emptied")
//     }
//     const todoUpdated = await Todo.findByIdAndUpdate({
//         _id: todoId,
//         createdBy: userId
//     }, req.body, 
//     {new:true, runValidators: true}
//     )
//     if (!todoUpdated) {
//         throw new NotFoundError(`No todo with id`)
//     }
//     res.status(StatusCodes.OK).json({todoUpdated})
// }

// const deleteTodo = async (req,res) => {
//     const {user: {userId}, params: {id: todoId}} = req
//     const todo = await Todo.findByIdAndRemove({
//         _id: todoId,
//         createdBy: userId
//     })
//     if (!todo) {
//         throw new NotFoundError(`No todo with id`)
//     }
//     res.status(StatusCodes.OK).json("delete")
// }


module.exports = { 
    getAllOTodos, 
    getOTodo,
    createOTodo,
    // updateTodo,
    // deleteTodo
}