import Api from './Api'

export default {
    create(data) {
        return Api().post('analysepat', data)
    },
    getAll() {
        return Api().get('analysepat')
    },
    getOne(num) {
        return Api().get(`analysepat/${num}`)
    },
    delete(id) {
        return Api().delete(`analysepat/${id}`)
    },
    update(id, data) {
        return Api().put(`analysepat/${id}`, data)
    },
    payement(data, num) {
        return Api().put(`payement/${num}`, data)
    },
    validation(num) {
        return Api().put(`validate/${num}`)
    },
}