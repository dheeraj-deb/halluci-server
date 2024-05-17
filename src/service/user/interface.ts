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
  phonenumber: string;
  address: Address;
  password: string;
}

export interface RegistrationResponse {
  status: number;
  message: string;
}

export interface LoginInput {
  name: string;
  password: string;
}
