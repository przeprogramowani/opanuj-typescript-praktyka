export class UserModule {
  private users = [];

  addUser(user) {
    this.users.push(user);
  }

  removeUser(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        this.users.splice(i, 1);
        break;
      }
    }
  }

  getUser(userId) {
    for (let user of this.users) {
      if (user.id == userId) {
        return user;
      }
    }
    return null;
  }

  filterUsers(filterFn) {
    return this.users.filter((user) => {
      let result = filterFn(user);
      return result.isValid;
    });
  }
}

const userModule = new UserModule();
export const { addUser, removeUser, getUser, filterUsers } = userModule;
