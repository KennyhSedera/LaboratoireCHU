import Api from './Api'

export default {
    create(data){
        return Api().post('/role', data)
    },
    getAll(){
        return Api().get('/role')
    },
}