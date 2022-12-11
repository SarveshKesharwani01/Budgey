const { prisma } = require("../constats/config");
const { DateTime } = require("luxon");

const transaction_post = async (req, res) => {
  if (req.session.userId) {
    const date = new Date(req.body.date).toISOString();
    const wallet = await prisma.wallet
      .findUnique({
        where: {
          userId: req.session.userId,
        },
      })
      .catch();

    console.log({
      title: req.body.title,
      money: req.body.money,
      data: date,
      info: req.body.info,
      transactionCategoryId: req.body.transactionCategoryId,
      walletId: wallet.id,
    });
    try {
      await prisma.transaction.create({
        data: {
          title: req.body.title,
          money: req.body.money,
          date: date,
          info: req.body.info,
          transactionCategoryId: req.body.transactionCategoryId,
          walletId: wallet.id,
        },
      });
      res.status(200).send("Expense Stored Successfully");
    } catch (err) {
      console.log(err);
      res.status(400).send({
        instancePath: "Error",
        message: "Expense Couldn't be Stored ",
      });
    }
  } else {
    res.status(401).send("Please Login");
  }
};

const transaction_get = async (req, res) => {
  if (req.session.userId) {
    let { firstDate, lastDate, category, dateSort, priceSort, take, skip } =
      req.query;
    //console.log(`firstDate: ${firstDate}, lastDate: ${lastDate}, category: ${category}, dateSort: ${dateSort},
    //priceSort: ${priceSort}, take: ${take}, skip: ${skip}`);
    if (!Number(skip)) {
      skip = 0;
    }
    if (!Number(take)) {
      take = 20;
    }

    const transaction = await prisma.transaction
      .findMany({
        where: {
          wallet: {
            userId: req.session.userId,
          },
          date: {
            gte:
              firstDate != undefined
                ? DateTime.fromISO(firstDate).toISO()
                : DateTime.now().minus({ days: 30 }).toISO(),
            lt:
              lastDate != undefined
                ? DateTime.fromISO(lastDate).toISO()
                : DateTime.now().toISO(),
          },
          transactionCategoryId: {
            equals: category != undefined ? parseInt(category) : undefined,
          },
        },
        // skip: parseInt(skip),
        // take: parseInt(take),
        orderBy: {
          date: dateSort != undefined ? dateSort : undefined,
          money: priceSort != undefined ? priceSort : undefined,
        },
        select: {
          title: true,
          money: true,
          date: true,
          info: true,
          id: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send("Transaction Error");
      });
    res.json(transaction);
    //console.log(transaction);
  } else res.status(401).send("Please Login");
};

const transaction_delete = async (req, res) => {
  if (req.session.userId) {
    let transactionId = parseInt(req.params.transactionId);
    let transaction_remove;
    try {
      transaction_remove = await prisma.transaction.deleteMany({
        where: {
          id: transactionId,
          wallet: {
            userId: req.session.userId,
          },
        },
      });
    } catch (e) {
      res
        .status(500)
        .send("Something Went Wrong While deleting this Transaction");
      return;
    }
    if (transaction_remove?.count) {
      res.status(200).send("Transaction Successfully Removed");
      return;
    }
    res
      .status(400)
      .send("Something worng happened while deleting the transaction");
  } else {
    res.status(401).send("Please Login");
  }
};

const transaction_add_category = async (req, res) => {
  if (req.session.userId) {
    const wallet = await prisma.wallet
      .findUnique({
        where: {
          userId: req.session.userId,
        },
      })
      .catch();

    try {
      await prisma.transactionCategory.create({
        data: {
          name: req.body.name,
          walletId: wallet.id,
          // Transactions: { create: [] },
        },
      });
      res.status(200).send("Category Added Successfully");
    } catch (err) {
      console.log(err);
      res.status(400).send({
        instancePath: "Error",
        message: "Category Could Not Be Added",
      });
    }
  } else {
    res.status(401).send("Please Login");
  }
};
module.exports = {
  transaction_post,
  transaction_get,
  transaction_delete,
  transaction_add_category,
};
