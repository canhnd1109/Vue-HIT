<template>
    <div class="product-info">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-5">Admin</h3>
            <router-link to="/home">Back</router-link>
        </div>

        <div class="container">
            <form @submit.prevent="">
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-9">
                        <input
                            type="text"
                            class="form-control"
                            v-model="admin.email"
                            @blur="validateUser"
                            v-bind:class="{ 'is-invalid': errors.email }"
                        />
                        <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-9">
                        <input
                            type="text"
                            class="form-control"
                            v-model="admin.password"
                            @blur="validateUser"
                            v-bind:class="{ 'is-invalid': errors.password }"
                        />
                        <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9 text-left">
                        <button type="" class="btn btn-primary mx-3" @click="handleLogin()">Login</button>

                        <button type="" class="btn btn-danger" @click="cancel()">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'UserAdmin',

    data() {
        return {
            errors: {
                email: '',
                password: '',
            },
            admin: {
                email: '',
                password: '',
            },
        };
    },

    methods: {
        validateUser() {
            this.errors = {
                email: '',
                password: '',
            };
            if (!this.admin.email) {
                this.errors.email = 'User eamil is required';
            } else if (!this.isEmail(this.admin.email)) {
                this.errors.email = 'The email invalid ';
            }
            if (!this.admin.password) {
                this.errors.password = 'User password is required';
            }
        },
        isEmail(email) {
            return /^\S+@\S+\.\S+$/.test(email);
        },

        async getAdminData() {
            try {
                const admin = await axios.get(`${import.meta.env.VITE_APP_ROOT_API}/login`);
                return admin;
            } catch (err) {
                console.log(err);
            }
        },

        async handleLogin() {
            console.log('email', this.admin.email);
            console.log('password', +this.admin.password);

            const data = await this.getAdminData();

            console.log('email', data.data[0].email);
            console.log('password', data.data[0].password);

            try {
                axios.post(`${import.meta.env.VITE_APP_ROOT_API}/login`, data);
                if (data.status === 200) {
                    if (this.admin.email === data.data[0].email && +this.admin.password === data.data[0].password) {
                        window.location.href = '/home';
                    } else {
                        alert('Email or passsword not exist ');
                    }
                }
                console.log('data post', data);
            } catch (error) {
                console.log(error);
            }
        },

        cancel() {
            (this.admin.email = ''), (this.admin.password = '');
        },
    },
};
</script>
