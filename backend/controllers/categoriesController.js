const { prisma } = require("../constats/config.js");
const { DateTime } = require("luxon");

const categories_get = async (req, res) => {
  if (req.session.userId) {
    let ctgs;
    const wallet = await prisma.wallet
      .findUnique({
        where: {
          userId: req.session.userId,
        },
      })
      .catch();
    try {
      ctgs = await prisma.transactionCategory
        .findMany({
          where: {
            walletId: wallet.id,
          },
        })
        .catch(() => console.log("Categories Error"));

      if (ctgs.length === 0) {
        await prisma.transactionCategory
          .createMany({
            data: [
              { name: "Study", walletId: wallet.id },
              { name: "Food", walletId: wallet.id },
              { name: "Entertainment", walletId: wallet.id },
              { name: "Travel", walletId: wallet.id },
              { name: "Miscellaneous", walletId: wallet.id },
            ],
            skipDuplicates: true,
          })
          .then(console.log("Default categories set"))
          .catch((e) => {
            console.log(e);
          });

        ctgs = await prisma.transactionCategory
          .findMany({
            where: {
              walletId: wallet.id,
            },
          })
          .catch(() => console.log("Categories Error"));
        // console.log("new ctgs: ", ctgs);
        res.status(200).send(ctgs);
      } else {
        res.status(200).send(ctgs);
      }
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
      // console.log(transactions);
      res.send(transactions);
    } catch {
      res.status(400).send("Transaction Error");
    }
  }
};

module.exports = { categories_get, categories_transaction_sum };
