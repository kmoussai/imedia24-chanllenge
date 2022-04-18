interface IUser {
  id: string;
  title: string;
  lastName: string;
  firstName: string;
  picture: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  location?: {
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
}

export type { IUser };
