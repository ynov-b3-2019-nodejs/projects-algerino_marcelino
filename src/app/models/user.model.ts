import {Role} from './role.model';

export class User {
  public Roles: Array<Role>;
  public createdAt: Date;
  public email: String;
  public fullname: String;
  public hashedPassword: String;
  public id: Number;
  public isAdmin: Boolean;
  public updatedAt: Date;

  public IsAdmin() {
    for (const role of this.Roles) {
      if (role.code === 'admin') {
        return true;
      }
    }
    return false;
  }

  public IsRPor() {
    for (const role of this.Roles) {
      if (role.code === 'RPor') {
        return true;
      }
    }
    return false;
  }

  public IsRPro() {
    for (const role of this.Roles) {
      if (role.code === 'RPro') {
        return true;
      }
    }
    return false;
  }

  public IsRLiv() {
    for (const role of this.Roles) {
      if (role.code === 'RLiv') {
        return true;
      }
    }
    return false;
  }
}
