const { prisma } = require("../constats/config.js");
const { DateTime } = require("luxon");

const categories_get = async (req, res) => {
  if (req.session.userId) {
    let ctgs;
    try {
      ctgs = await prisma.transactionCategory
        .findMany()
        .catch(() => console.log("Categories Error"));
      if (ctgs) res.status(200).send(ctgs);
    } catch {
      res.status(401).send("Please Login");
    }
  }
};

const categories_transaction_sum = async (req, res) => {
  if (req.session.userId) {
    let firstDate = req.query.first;
    let lastDate = DateTime.now().toISO();

    if (!firstDate) {
      firstDate = DateTime.now().minus({ month: 1 }).toISO();
    }

    try {
      const transactions = await prisma.transaction.groupBy({
        by: ["transactionCategoryId"],
        _sum: {
          money: true,
        },
        where: {
          wallet: {
            userId: req.session.userId,
          },
          date: {
            gte: firstDate,
            lt: lastDate,
          },
        },
      });
      res.send(transactions);
    } catch {
      res.status(400).send("Transaction Error");
    }
  }
};

module.exports = { categories_get, categories_transaction_sum };
