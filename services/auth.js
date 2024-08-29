const jwt = require('jsonwebtoken');
const secret = "rampalYadav123";
function createToken(user){
    const payload = {
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role
    }
    return jwt.sign(payload, secret);
}
function verifyToken(token){
    const payload= jwt.verify(token, secret);
    return payload;
}
module.exports={
    createToken,
    verifyToken
}