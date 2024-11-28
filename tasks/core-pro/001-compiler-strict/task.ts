class BuggyUserService {
  private database;

  processUserData(data) {
    function innerFunction() {
      return this.database.process(data);
    }

    return innerFunction();
  }

  async getUserSettings(userId: string) {
    const user = await this.fetchUser(userId);
    return user.settings.theme;
  }

  private handlers: Array<(error: Error) => void> = [];

  setErrorHandler(handler: (error: string) => void) {
    this.handlers.push(handler);
  }

  processUsers(users: any[]) {
    const boundProcess = this.processUser.bind(this);
    users.forEach((user) => boundProcess(user));
  }

  private processUser(user: any, index: number) {
    console.log(index, user);
  }

  async dangerousOperation() {
    try {
      await this.riskyCall();
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateUserPreferences(userId, preferences) {
    const user = await this.fetchUser(userId);

    user.preferences = {
      ...user.preferences,
      ...preferences,
    };

    return this.database.save(user);
  }

  private async fetchUser(id) {
    return this.database.findOne({ id });
  }

  private async riskyCall() {
    throw new Error('Something went wrong');
  }
}

const service = new BuggyUserService();

service.processUserData({ name: 'John' });
