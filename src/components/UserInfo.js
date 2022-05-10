import { coghortUrl, token } from "../utils/autorization";

export default class UserInfo {
  constructor({nameSelector, infoSelector, picSelector}){
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._userPicElement = document.querySelector(picSelector);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }
  
  getUserInfo() {
    const info = {};
    info['user-name'] = this._nameElement.textContent;
    info['user-profession'] = this._infoElement.textContent;
    return info;
  }

  setUserInfo(args) {
    console.log(args['user-name'])
    this._nameElement.textContent = args['user-name'];
    this._infoElement.textContent = args['user-profession'];
    if (args['user-pic']) this._userPicElement.src = args['user-pic'];
  }
}