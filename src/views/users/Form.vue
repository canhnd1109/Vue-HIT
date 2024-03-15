<template>
    <div>
        <div class="product-info">
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 class="display-5">User Infomation</h3>
                <router-link to="/user">Back</router-link>
            </div>

            <div class="container">
                <form @submit.prevent="save()">
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">User name</label>
                        <div class="col-sm-9">
                            <input
                                type="text"
                                class="form-control"
                                v-model="users.name"
                                @blur="validateUser"
                                v-bind:class="{ 'is-invalid': errors.name }"
                            />
                            <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">User email</label>
                        <div class="col-sm-9">
                            <input
                                type="text"
                                class="form-control"
                                v-model="users.email"
                                @blur="validateUser"
                                v-bind:class="{ 'is-invalid': errors.email }"
                            />
                            <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">User password</label>
                        <div class="col-sm-9">
                            <input
                                type="text"
                                class="form-control"
                                v-model="users.password"
                                @blur="validateUser"
                                v-bind:class="{ 'is-invalid': errors.password }"
                            />
                            <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                        <div class="col-sm-9 text-left">
                            <button type="submit" class="btn btn-primary fix-color">Save</button> &nbsp;
                            <button type="reset" class="btn btn-danger fix-color" @click="cancel()">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormProduct',

    data() {
        return {
            errors: {
                name: '',
                email: '',
                password: '',
            },
            users: {
                name: '',
                email: '',
                password: '',
            },
        };
    },

    created() {
        let userId = this.$route.params.id;
        console.log('params Form User', this.$route.params.id);
        if (userId) {
            this.getUser(userId);
        }
    },

    //test
    // mounted() {
    //     this.$request
    //         .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //         .then((response) => {
    //             this.info = response.data.bpi;
    //             console.log('respone test', response);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             this.errored = true;
    //         })
    //         .finally(() => (this.loading = false));
    // },

    //
    methods: {
        validateUser() {
            let isValid = true;

            this.errors = {
                name: '',
                email: '',
                password: '',
            };

            if (!this.users.name) {
                this.errors.name = 'User name is required';
                isValid = false;
            }
            if (!this.users.email) {
                this.errors.email = 'User eamil is required';
                isValid = false;
            } else if (!this.isEmail(this.users.email)) {
                this.errors.email = 'The email invalid ';
                isValid = false;
            }
            if (!this.users.password) {
                this.errors.password = 'User password is required';
                isValid = false;
            }
            return isValid;
        },

        isEmail(email) {
            return /^\S+@\S+\.\S+$/.test(email);
        },

        save() {
            if (this.validateUser()) {
                if (this.users.id) {
                    this.$request
                        .put(`${import.meta.env.VITE_APP_ROOT_API}/users/${this.users.id}`, this.users)
                        .then((res) => {
                            if (res.data.success) {
                                this.$router.push({
                                    name: 'userList',
                                });
                                return;
                            }
                        });
                }

                //create
                this.$request.post(`${import.meta.env.VITE_APP_ROOT_API}/users`, this.users).then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        this.$router.push({
                            name: 'userList',
                        });
                        return;
                    }
                    alert('Something went wrong');
                });
            }
        },

        getUser(userId) {
            this.$request.get(`${import.meta.env.VITE_APP_ROOT_API}/users/${userId}`, this.users).then((res) => {
                console.log('user', res.data);
                this.users = res.data;
            });
        },
        cancel() {
            (this.users.name = ''), (this.users.email = ''), (this.users.password = '');
        },
    },
};
</script>

<style lang="css" scoped>
.fix-color {
    color: black;
}
.fix-color:hover {
    color: white;
}
</style>
