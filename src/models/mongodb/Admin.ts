import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  nickname: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>({
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash de la contraseña antes de guardarla
AdminSchema.pre("save", async function (next) {
  const admin = this as IAdmin;
  if (!admin.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  next();
});

// Método para comparar contraseñas
AdminSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
