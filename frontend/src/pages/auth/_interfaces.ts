

export interface IUserDetails {
    email : string,
    password : string
  }

  export interface SignupDetails extends IUserDetails {
    name : string
  }

  export interface ResponseUser {
    _id : string,
    name : string,
    email : string,
    token : string
}