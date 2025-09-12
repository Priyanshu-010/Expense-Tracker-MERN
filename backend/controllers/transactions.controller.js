import Transaction from "../models/Tansaction.js";
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    res.status(500).send("Server Error");
  }
};

export const createTransactions = async (req, res) => {
  const { title, amount, date, category } = req.body;
  try {
    const newTransaction = new Transaction({
      title,
      amount,
      date,
      category,
      user: req.user.id,
    });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const updateTransaction = async (req, res) => {
  const { title, amount, date, category } = req.body;
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ msg: "Transaction not found" });
    if (transaction.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: { title, amount, date, category } },
      { new: true }
    );
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteTransactions = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ msg: "Transaction not found" });
    if (transaction.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ msg: "Transaction removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
