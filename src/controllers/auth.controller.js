const UsersModel = require("../models/users.model");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new UsersModel({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password1, 8),
    city: req.body.city,
    type: req.body.type,
  });

  user.save((err, user) => {
    if (err) {
      res.redirect("/login?msg=500");
      return;
    }
    const username = encodeURIComponent(user.username);
    res.redirect(`/login?success=added&subject=${username}`);
  });
};

exports.login = (req, res) => {
  UsersModel.findOne({
    username: req.body.inputLoginUsername,
  }).exec((err, user) => {
    if (err) {
      res.redirect("/login?msg=500");
      return;
    }
    if (!user) return res.redirect("/login?msg=username");

    const passwordIsValid = bcrypt.compareSync(
      req.body.inputLoginPassword,
      user.password
    );
    if (!passwordIsValid) return res.redirect("/login?msg=password");

    const username = encodeURIComponent(user.username);
    const city = encodeURIComponent(user.city);
    const type = encodeURIComponent(user.type);
    const remember =
      req.body.remember === "remember-me"
        ? encodeURIComponent("true")
        : encodeURIComponent("false");

    res.redirect(
      `/?user=${username}&city=${city}&type=${type}&remember=${remember}`
    );
  });
};
