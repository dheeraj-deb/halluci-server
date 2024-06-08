import User from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterInput, RegistrationResponse, SendOtpInput, VerifyOtpInput } from "./interface";
import { ConflictException, UnauthorizedException, NotFoundException } from "../../utils/errors";
import OTP from "../../models/otp.model";
import { comparePassword, encryptPassword } from "../../libs/bcrypt";
import otpGenerator from "../../utils/otpGenerator";
import { StatusCodes } from "http-status-codes";

export const registration = async (
    _: any,
    { name, shopname, phone, address,  }: RegisterInput
): Promise<RegistrationResponse> => {
    const user = new User({ name, shopname, phone, address });
    await user.save();
    return {
        status: 200,
        message: "User Registered Successfully",
    };
};

export const  verifyOtpWhileRegistering= async (_: any, { phone, otp }: VerifyOtpInput, context: Record<string, any>) => {
    const userExist = await User.findOne({ phone })
    console.log(userExist,"user does exit");
    
    if(userExist)  throw new ConflictException("User already exist")
    const otpRecord = await OTP.findOne({ phone, used: false }).lean()
    if (!otpRecord) throw new UnauthorizedException("Invalid OTP")
    const validOtp = await comparePassword(otp, otpRecord.otp)


    if (!validOtp)
        throw new UnauthorizedException(
            `The phone number ${phone} has not been verified`,
        );
    await OTP.updateOne({ phone }, { $set: { used: true } })
    console.log({ phone, otp });

    const token = jwt.sign({ phone }, userExist ? process.env.JWT_SECRET || "dev0" : "regKey", { expiresIn: "1hr" })
    console.log(context);

    context.res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { message: `The phone number ${phone} has been verified`, token, status: 200 };
};
export const verifyOtpWhileLogin = async (_: any, { phone, otp }: VerifyOtpInput, context: Record<string, any>) => {
    const userExist = await User.findOne({ phone })
    if (!userExist) throw new NotFoundException("User not found")
    const otpRecord = await OTP.findOne({ phone, used: false }).lean()
    if (!otpRecord) throw new UnauthorizedException("Invalid OTP")

    const validOtp = await comparePassword(otp, otpRecord.otp)
    console.log(validOtp,otp,otpRecord.otp,'otp');
    


    if (!validOtp)
        throw new UnauthorizedException(
            `The phone number ${phone} has not been verified`,
        );
    await OTP.updateOne({ phone }, { $set: { used: true } })
    console.log({ phone, otp });

    const token = jwt.sign({ phone }, userExist ? process.env.JWT_SECRET || "dev0" : "regKey", { expiresIn: "1hr" })
    console.log(context);

    context.res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { message: `The phone number ${phone} has been verified`, token, status: 200 };
};
const logout = (_: any, {}, context: Record<string, any>)=>{
    context.res.cookie('token', "", { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 0 });

}
const messagingService = {
    async send(phone: string) {
        // const otp = await otpGenerator(4) ⭕ uncomment this line when messaging service activates
        // let message: string;

        // switch (role) {
        //   case Role.Executive:
        //     message = `Dear User, Welcome to the Wager Sales App. We are thrilled to have you.To sign in please use the OTP, ${otp}`;
        //     break
        //   case Role.Customer:
        //     message = `Dear Valued Customer,%nWelcome to Sanion, We are delighted to have you join us. To join Sanion, please use the OTP ${otp}.`
        //     break
        //   default:
        //     log(`Unexpected role (${role})`)
        //     break

        // }
        // console.log(message);

        // const params = new URLSearchParams();
        // params.append('numbers', phone);
        // params.append('message', message);
        // params.append('test', 'true');

        try {
            // const response = await this.otp.post('/send', params);
            // console.log(response.data);

            // response.data.otp = otp
            // return response;

            const otp = "0000"
            return otp
        } catch (error) {
            throw error;
        }
        // return {status:StatusCodes.NOT_ACCEPTABLE}
    }
}


export const sendOtp = async (_: any, { phone }: SendOtpInput, context: Record<string, any>) => {

    try {
        const otp = await messagingService.send(phone);
        console.log(otp);
        // const { otp } = res.data
        const encryptedOtp = await encryptPassword(otp)
        await OTP.deleteMany({ phone })
        await OTP.create({ otp: encryptedOtp, phone: phone })
        return { message: `OTP successfully sent to ${phone}`, status: 200 }
    } catch (err) {
        console.log(err);
        return { status: 500, message: "Something went wrong" }
    }
};


export async function doesUserExist(phone: string) {
    return await User.exists({ phone: phone })
}

