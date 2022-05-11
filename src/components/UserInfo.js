export default class UserInfo {
  constructor({nameSelector, infoSelector, picSelector, setInfo, setAvatar}){
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._userPicElement = document.querySelector(picSelector);
    this._setInfo = setInfo;
    this._setAvatar = setAvatar;
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
    if (args.avatar) {
      this._setAvatar(args)
        .then(res => res.json())
        .then(res => this._userPicElement.src = res.avatar);
    } else {
      this._setInfo(args)
        .then(res => res.json())
        .then(res => {
          this._nameElement.textContent = res.name;
          this._infoElement.textContent = res.about;
          this._userPicElement.src = res.avatar;
        });
    }
  }


  renderInfo(args) {
    this._nameElement.textContent = args['user-name'];
    this._infoElement.textContent = args['user-profession'];
    if (args['user-pic']) this._userPicElement.src = args['user-pic'];
  }
}