import { registration, verifyOtpWhileLogin,verifyOtpWhileRegistering, sendOtp } from "../service/auth/auth.service";


export const authResolver = {
    Mutation: {
        registration,
        sendOtp,
        verifyOtpWhileLogin,
        verifyOtpWhileRegistering
    },
};
