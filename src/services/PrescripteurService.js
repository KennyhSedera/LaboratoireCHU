import Api from './Api'

export default {
    create(data){
        return Api().post('/prescripteur', data)
    },
    getAll(){
        return Api().get('/prescripteur')
    },
    delete(num){
        return Api().delete('/prescripteur/'+num)
    },
    update(data, num){
        return Api().put('/prescripteur/'+num, data)
    },
}