import {Role} from './role.model';

export class User {
  public Roles: Array<Role>;
  public createdAt: Date;
  public email: String;
  public fullname: String;
  public hashedPassword: String;
  public id: Number;
  public updatedAt: Date;


  constructor(Roles: Array<Role>, email: String, fullname: String) {
    this.Roles = Roles;
    this.email = email;
    this.fullname = fullname;
  }
}

export function isAdmin(user: User) {
  for (const role of user.Roles) {
    if (role.code === 'admin') {
      return true;
    }
  }
  return false;
}

export function IsRPor(user: User) {
  for (const role of user.Roles) {
    if (role.code === 'RPor') {
      return true;
    }
  }
  return false;
}

export function IsRPro(user: User) {
  for (const role of user.Roles) {
    if (role.code === 'RPro') {
      return true;
    }
  }
  return false;
}

export function IsRLiv(user: User) {
  for (const role of user.Roles) {
    if (role.code === 'RLiv') {
      return true;
    }
  }
  return false;
}
