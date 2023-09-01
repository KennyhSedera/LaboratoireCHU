import Api from "./Api";

export default {
    create(data){
        return Api().post('examen', data)
    },
    createmat(data){
        return Api().post('matexam', data)
    },
    getAll(){
        return Api().get('examen')
    },
    getMax(){
        return Api().get('examenmax')
    },
    getAllMat(id){
        return Api().get(`matexam/${id}`)
    },
    delete(num){
        return Api().delete('examen/'+num)
    },
    update(data, num){
        return Api().put('examen/'+num, data)
    },
}