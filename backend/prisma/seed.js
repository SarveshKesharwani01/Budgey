const { PrismaClient } = require("@prisma/client");
const { prisma } = require("../constats/config");

// Add Categories as seed Data

const seed = async () => {
  try {
    let ctgs = await prisma.transactionCategory.findMany();
    if (!ctgs.length) {
      // Create Default Categories
      console.log("Creating Default Categories");
      await prisma.transactionCategory
        .createMany({
          data: [
            { name: "Study" },
            { name: "Food" },
            { name: "Entertainment" },
            { name: "Travel" },
            { name: "Miscellaneous" },
          ],
          skipDuplicates: true,
        })
        .catch(() => {
          console.log("Error Seeding {Prisma Client}");
        });
    }
  } catch {
    console.log("Error Seeding");
  }
};

seed(); 