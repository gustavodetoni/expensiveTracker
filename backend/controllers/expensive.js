const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async(req, res) => {
    const {title, amount, category, description, date} = req.body

    const expense = ExpenseSchema({
        title, 
        amount,
        category,
        description,
        date
    })

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({message: 'Todos precisam estar preenchidos!'})
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: 'Precisa ser positivo'})
        }
        await expense.save()
        res.status(200).json({message: 'Despesa Adicionada'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(expense)
}

exports.getExpense = async(req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error){
        res.status(500).json({message:'Server Error'})
    }
}

exports.deleteExpense = async(req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message:'Despesa Deletada'})
        })
        .catch((err) =>{
            res.status(500).json({message:'Server Error'})
        })
}
