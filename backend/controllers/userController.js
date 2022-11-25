const { prisma } = require("../constats/config");
const bycrypt = require("bcrypt");

const user_update_meta = async (req, res) => {
  const { firstName, lastName } = req.body;
  // if user is logged in
  if (req.session.userId) {
    try {
      await prisma.user.update({
        where: {
          id: req.session.userId,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      });
      res.status(200).send("Updated");
    } catch (e) {
      console.log(e);
      res.status(500).send("Error {Update Meta}");
    }
  } else {
    // if not
    res.status(401).send("Please Login");
  }
};

// update pw
const user_update_password = async (req, res) => {
  console.log("update password");
  let user;
  if (req.session.userId) {
    // find user
    try {
      user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
      });
    } catch {
      res.status(500).send("Err");
      return;
    }
  } else {
    res.status(401).send("Please Login");
  }

  // if user is found
  if (user) {
    const isPassCorrect = await bycrypt.compare(oldPassword, user.password);
    if (isPassCorrect) {
      // hashing and salting new password
      const saltRounds = 10;
      let newPassword = await bycrypt.hash(password, saltRounds);
      try {
        await prisma.user.update({
          where: {
            id: req.session.userId,
          },
          data: {
            password: newPassword,
          },
        });
        // delete all sessions (logout everyone)
        try {
          // req.session.destroy();
          await prisma.session.deleteMany({
            where: {
              data: {
                endsWith: `,"userId":${req.session.userId}}`,
              },
            },
          });
          res.clearCookie("sess").status(200).send("Updated");
        } catch {
          res.status(500).send("err deleting sessions");
        }
      } catch {
        res.status(500).send("Cannot Update Password");
      }
    } else {
      // if password is not correct
      res.status(403).send("Wrong Password");
    }
  } else {
    // user not found
    res.status(401).send("Please Login");
  }
};
module.exports = { user_update_meta, user_update_password };
