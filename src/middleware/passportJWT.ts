import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import userModel from '../models/user.model'

const cookieExtractor = function(req:Record<string,any>) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};


const JwtConfig = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET||"dev0",

}
const passportJwtAuth = new JwtStrategy(JwtConfig, async (payload, done) => {
   
    
    try {
        const user = await userModel.findOne({ phone: payload.phone })
        if (!user) return done(null, false)
        done(null, user)
    } catch (err) {
        done(err, false)
    }
})

export default passportJwtAuth
