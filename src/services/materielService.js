import Api from './Api'

export default {
    create(data) {
        return Api().post('materiel', data)
    },
    getAll() {
        return Api().get('materiel')
    },
    delete(num) {
        return Api().delete('materiel/' + num)
    },
    update(data, num) {
        return Api().put('materiel/' + num, data)
    },
    entree(data) {
        return Api().post('addentree', data)
    },
    sortie(data) {
        return Api().post('addsortie', data)
    },
}