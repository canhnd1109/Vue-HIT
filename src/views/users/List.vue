<template>
    <div>
        <div class="product-list">
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h2 class="display-4">User Management</h2>
                <p>
                    <router-link to="/user/create">Add new</router-link>
                </p>
            </div>

            <div class="container">
                <div class="card-deck mb-3 text-center">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="index">
                                <th scope="row">{{ user.id }}</th>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.password }}</td>
                                <td>
                                    <router-link :to="{ name: 'userEdit', params: { id: user.id } }">
                                        <button class="btn btn-primary mr-3">Edit</button>
                                    </router-link>
                                    <button class="btn btn-danger" @click="onDelete(user.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListProduct',
    data() {
        return {
            users: [],
        };
    },
    created() {
        this.getAllUser();
    },
    methods: {
        getAllUser() {
            this.$request.get(`${import.meta.env.VITE_APP_ROOT_API}/users`).then((res) => {
                this.users = res.data;
            });
        },
        onDelete(userId) {
            this.$swal
                .fire({
                    title: 'Do you want to delete?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                })
                .then((result) => {
                    console.log('result', result);
                    if (result.isConfirmed) {
                        this.$request.delete(`${import.meta.env.VITE_APP_ROOT_API}/users/${userId}`).then((res) => {
                            if (res.data.success) {
                                this.$swal.fire('Deleted!', '', 'success');
                                this.getAllUser();
                            }
                        });
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
