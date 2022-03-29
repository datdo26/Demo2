export interface RawContact {
    id: string,
    firstName: string,
    lastName: string,
    company: string,
    phone: string,
    email: string,
    address: string,
    birthday: string,
    avatar: string
}

export interface RawCollection {
    id:string,
    title: string,
    list: []
}

export interface RawAuth {
    userId: string,
    userName: string,
    career: string
}