export class User {

  fullName = this.firstName + ' ' + this.lastName;

  constructor(public id: number, public username: string,
              public email: string, public firstName: string,
              public lastName: string, public password: string,
              public image: string, public creationDate: Date,
              public active: boolean, private link: URL,
              private postsUrl: URL, private commentsUrl: URL) {

  }

}
