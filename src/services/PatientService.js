import Api from './Api'

export default {
    create(data) {
        return Api().post('patient', data)
    },
    getAll() {
        return Api().get('patient')
    },
    getOne(num) {
        return Api().get(`patient/${num}`)
    },
    delete(num) {
        return Api().delete('patient/' + num)
    },
    update(data, num) {
        return Api().put('patient/' + num, data)
    },
}