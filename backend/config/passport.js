const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const pool = require('../keys/db');

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";


module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {

        pool.query('SELECT * FROM "USERS" WHERE id = $1', [jwt_payload.id])
        .then(user => {
            if(user){
                return done(null, {id: user.rows[0].id,
                    username: user.rows[0].username, 
                    firstname: user.rows[0].firstname, 
                    lastname: user.rows[0].lastname,
                    email: user.rows[0].email,
                    phone_number: user.rows[0].phone_number});
            }
            return done(null, false);
        }).catch(err => console.log(err));
    }));
}
