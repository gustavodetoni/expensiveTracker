const IncomeSchema = require("../models/IncomeMode")

exports.addIncome = async(req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Renda Adicionada'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async(req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error){
        res.status(500).json({message:'Server Error'})
    }
}

exports.deleteIncome = async(req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message:'Renda Deletada'})
        })
        .catch((err) =>{
            res.status(500).json({message:'Server Error'})
        })
}
