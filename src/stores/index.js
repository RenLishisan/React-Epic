import {observable, action} from 'mobx';

class AuthStore {
    @observable isLogin = false;
    @observable isLoading = false;
    @observable values = {
        username: '',
        password: ''
    }

    @action setIsLogin(isLogin) {
        this.isLogin = isLogin
    }

    @action setUsername(username) {
        this.values.username = username
    }

    @action setPassword(username) {
        this.values.password = password;
    }

    @action login() {
        console.log('登录中...')
        this.isLogin = true
        setTimeout(() => {
            console.log('登录成功！')
            this.isLogin = true
            this.isLoading = false;
        }, 1000)

    }

    @action reqister() {
        console.log('注册中...')
        this.isLogin = true
        setTimeout(() => {
            console.log('注册成功！')
            this.isLogin = true
            this.isLoading = false;
        }, 1000)

    }
    @action logout(){
        console.log('注销成功！')
    }
}

export AuthStore;