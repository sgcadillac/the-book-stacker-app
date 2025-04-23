const buildQuery = require("../utils/buildQuery");

const isValidName = (name) => /^[\p{L}\s'-]+$/u.test(name.trim());

const validateBookFields = (req, res, next) => {
  const { author_first_name, author_last_name, title } = req.body;

  if (!author_first_name || !author_last_name || !title) {
    return res.redirect(`/?error=missing_fields&${buildQuery(req.body)}`);
  }

  if (!isValidName(author_first_name)) {
    return res.redirect(
      `/?error=invalid_name&field=first&${buildQuery(req.body)}`
    );
  }

  if (!isValidName(author_last_name)) {
    return res.redirect(
      `/?error=invalid_name&field=last&${buildQuery(req.body)}`
    );
  }

  next();
};

module.exports = {
  validateBookFields,
};
