import userModel from "../../models/user.model";
import { ActiveResponse } from "./interface";

export const activate = async (
    _: any,
    input: { id: string },
): Promise<ActiveResponse> => {
    console.log(input);

    const user = await userModel.findByIdAndUpdate(
        input.id,
        [{ $set: { verified: { $not: "$verified" } } }],
        { new: true }
    );

    if (!user) {
        return {
            status: 404,
            message: "User not found",
        };
    }

    return {
        status: 200,
        message: "User verification status toggled successfully",
    };
};

export const getUser = async (
    _: any,
    input: { userId: string },
) => {
    const user = await userModel.findById(input.userId);

    return { status: 200, data: user };
};


export const getUsers = async (
    _: any,
    input: { userId: string },

) => {
    const user = await userModel.find({ role: "user" })
    return user
};
