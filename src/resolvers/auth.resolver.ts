import { registration, verifyOtp, sendOtp } from "../service/auth/auth.service";


export const authResolver = {
    Mutation: {
        registration,
        sendOtp,
        verifyOtp
    },
};
