import Api from '@/services/http-common'

class UploadFilesService {
  upload(file, id) {
    let formData = new FormData();

    formData.append("User_Profil", file);
    formData.append("id", id);

    return Api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
}

export default new UploadFilesService();