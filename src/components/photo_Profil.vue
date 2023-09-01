<template>
    <div>
        <v-card 
            v-if="currentImage === undefined"
            :img="`${profil}`" 
            style="border: 1px solid whitesmoke;" 
            class="rounded-circle mx-auto" 
            width="150" 
            height="150"
        >
            <v-btn class="v-sheet--offset" small fab style="position: absolute; top:70%; left: 75%;">
                <v-file-input
                    show-size
                    hide-input
                    label="Select Image"
                    accept="image/*"
                    class="mb-4 ml-2"
                    @change="selectImage"
                    prepend-icon="fa-camera"
                ></v-file-input>
            </v-btn>
        </v-card>
        <div v-if="currentImage != undefined" >
            <v-card
                :img="previewImage" 
                style="border: 1px solid whitesmoke;"
                class="rounded-circle border mx-auto" 
                width="150" height="150"
            >
            </v-card>
            Changer votre photo ?
            <v-row class="mt-2">
                <v-btn
                small
                class="elevation-1 text-capitalize px-8"
                @click="currentImage = undefined"
                > Non </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                small
                :loading="load"
                class="elevation-1 text-capitalize blue white--text ml-1 px-8"
                @click="accepted()"
                > Oui </v-btn>
            </v-row>
        </div>
    </div>
</template>
<script>
import LoginService from '@/services/LoginService';
import UploadFilesService from '@/services/UploadFilesService';


export default {
    data() {
        return {
            currentImage: undefined,
            previewImage: '',
            profil: '',
            id: null,
            load:false,
        }
    },
    methods: {
        selectImage(e) {
            this.currentImage = e;
            this.previewImage = URL.createObjectURL(this.currentImage);
        },
        getUser() {
            LoginService.getOne(this.id)
            .then(res => {
                this.profil=res.data.user[0].user_profil
            })
        },
        getUserConnected() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.id = user[0].id_user
        },
        accepted() {
            this.load = true
            setTimeout(() => {
                this.load = false
                this.upload()
            }, 2000)
        },

        upload() {
            if (!this.currentImage) {
                this.message = "Please select an Image!";
                return;
            }

            UploadFilesService.upload(
                this.currentImage,
                this.id,
            )
            .then(() => { this.currentImage = undefined; this.getUser() })
            .catch(() => { this.currentImage = undefined; });
        },
    },
    mounted() {
        this.getUserConnected()
        this.getUser()
    },
}
</script>