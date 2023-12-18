export interface CreateAdminInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    // Add other fields as needed
}

export interface CreateVendorInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    // Add other fields as needed
}