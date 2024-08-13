import { registration, verifyOtpWhileLogin, verifyOtpWhileRegistering, sendOtp, registerAdmin, loginAdmin, logout } from "../service/auth/auth.service";


export const authResolver = {
    Mutation: {
        registration,
        sendOtp,
        verifyOtpWhileLogin,
        verifyOtpWhileRegistering,
        registerAdmin,
        loginAdmin,
        logout
    },
};
