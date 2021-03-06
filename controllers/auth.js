const passport = require('passport');

module.exports = {
  google: {
    saveRequester(req, res, next) {
      req.session.redirect = req.headers.referer;
      next();
    },
    authenticate() {
      return passport.authenticate('google', {
        scope: ['profile']
      });
    },
    authenticateWithCode() {
      return passport.authenticate('google');
    },
    async callback(req, res) {
      await req.session.save();
      res.redirect(req.session.redirect);
    },
    logout(req, res) {
      req.logout();
      res.redirect(req.session.redirect);
    },
    isLoggedIn(req, res, next) {
      if(req.isAuthenticated()) {
        return next();
      } else {
        res.sendStatus(403);
      }
    }
  }
}
