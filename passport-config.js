const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email })
      if (!user) {
        return done(null, false, { message: 'No user found' })
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (err) {
      return done(err)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email'},authenticateUser))
  passport.serializeUser((user,done)=>done(null,user.id))
  passport.deserializeUser((id,done)=>{
      return done(null, getUserById(id))
  })
}

module.exports = initialize