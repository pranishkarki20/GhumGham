import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = new Schema(
{
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 15,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 14,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    role:{
        type: String,
        enum:[
            "customer",
            "admin",
            "agency",
        ],
        default:"customer"
    },
  },
{
    timestamps: true,
}
);

usersSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", usersSchema);