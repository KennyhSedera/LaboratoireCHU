import Api from './Api'

export default {
    register(data){
        return Api().post('signup', data)
    },
    login(data){
        return Api().post('signin', data)
    },
    verifyEmail(data){
        return Api().post('verifyemail', data)
    },
    verifyPassword(data){
        return Api().post('verifypassword', data)
    },
    upload(data){
        return Api().post('upload', data)
    },
    updatePass(data){
        return Api().put('password', data)
    },
    getOne(id){
        return Api().get(`user/${id}`)
    },
    get(data){
        return Api().post('user', data)
    },
    activer(id){
        return Api().put(`activer/${id}`)
    },

}
