import { Router } from 'express'
import { activate, addEthWallet, getUser, login, registration, requestPasswordReset, resetPassword, updateUserEmail, updateUserUsername, uploadAvatar } from '../controllers/auth.js'
import { checkAuth } from '../utils/CheckAuth.js';

const router = new Router()

//registration
router.post('/registration', registration)

//getUser
router.get('/getuser', checkAuth, getUser)

//login
router.post('/login', login)

//addEthWallet
router.post('/addethwallet', checkAuth, addEthWallet)

//changeEmail
router.patch("/updateemail", checkAuth, updateUserEmail);

//changeUserName
router.patch("/updateusername", checkAuth, updateUserUsername);

//avatar
router.post('/changeimg', checkAuth, uploadAvatar);

//activate
router.get('/activate/:link', activate);

//resetpassword
router.post("/requestreset", requestPasswordReset);
router.post("/resetpassword", resetPassword);

export default router