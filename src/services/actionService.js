import Api from "./Api"

export default {
    create(data) {
        return Api().post('action', data)
    },
    getAll(id) {
        return Api().get(`action/${id}`)
    },
    getActionAll() {
        return Api().get(`action`)
    },
}