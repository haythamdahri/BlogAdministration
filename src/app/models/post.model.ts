import {User} from './user.model';
import {Page} from './page.model';

export class Post {
  constructor(public id: number, public cover: string,
              public title: string, public content: string,
              public creationDate: Date, public creatorUrl: URL,
              public active: boolean, public views: number,
              public lnk: URL) {

  }
}
