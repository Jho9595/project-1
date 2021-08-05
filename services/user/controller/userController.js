const User = require("../model/user");
const { decode } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");

class Controller {
  static register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });

    } else {
      if (
        typeof email === "string" &&
        typeof password === "string"
      ) {
        const newUser = {
          email,
          password
        };

        User.findOne(email)
          .then((data) => {
            console.log('--------------------------------', data ,'------------------------------------------');
            if (data) {
              return false;
            } else {
              return User.create(newUser);
            }

          })
          .then((data) => {
            if (data) {
              res
                .status(201)
                .json({ message: 'User successfully created' });

            } else {
              res
                .status(400)
                .json({ message: "User has already register before" });
            }
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      } else {
        res
          .status(400)
          .json({ message: "There seems an error on your data types" });
      }
    }
  }

  static login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email or Password required" });

    } else if (typeof email === "string" && typeof password === "string") {
      User.findOne(email)
        .then((data) => {
          if (data) {
            if (decode(password, data.password)) {
              const { _id, email } = data;
              const access_token = sign({ id: _id, email });

              res.status(200).json({ access_token });
            } else {
              res.status(400).json({ message: "Invalid Password or Email" });
            }
          } else {
            res.status(400).json({ message: "User Not Found" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res
        .status(400)
        .json({ message: "There seems an error on your data types" });
    }
  }
}

module.exports = Controller;
