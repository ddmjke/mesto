export default class UserInfo {
  constructor({nameSelector, infoSelector}){
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
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
    this._nameElement.textContent = args['user-name'];
    this._infoElement.textContent = args['user-profession'];
  }
}