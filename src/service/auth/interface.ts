export interface Address {
  place: string;
  pincode: string;
  city: string;
  state: string;
  address: string;
}

export interface RegisterInput {
  name: string;
  shopname: string;
  phone: string;
  address: Address;
}

export interface RegisterAdminInput {
  name: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  token: string
}
export interface RegistrationResponse {
  status: number;
  message: string;
}


export interface SendOtpInput {
  phone: string;
}

export interface VerifyOtpInput {
  phone: string;
  otp: string;
}

