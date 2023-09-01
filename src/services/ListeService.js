import Api from "./Api";

export default{
    create(data){return Api().post('list', data)},
    getAll(numanal){return Api().get(`list/${numanal}`)},
    addResultat(id, data){return Api().post(`resultat/${id}`, data)}
}