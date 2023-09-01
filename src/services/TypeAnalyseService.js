import Api from './Api'

export default {
    create(data){
        return Api().post('/type', data)
    },
    getAll(){
        return Api().get('/type')
    },
}