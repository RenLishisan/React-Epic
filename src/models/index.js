import AV, {Query, User} from "leancloud-storage";

AV.init({
  appId: "PaHnXV0gRaXnbaCWzrAVI4w9-gzGzoHsz",
  appKey: "Kn7L5MEFlYSO19cyUHEmLxSY",
  serverURL: "https://pahnxv0g.lc-cn-n1-shared.com"
});

const Auth = {
  register(username, password) {
    let user = new User();
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error))
    })
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginedUser =>resolve(loginedUser),error =>reject(error) )
    })
  },
    logout(){
      User.logOut()
    },
    gitCurrentUser(){
      return User.current()
    }
}

export  {
    Auth
}