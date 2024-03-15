<template>
    <div>
        <div class="product-list">
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h2 class="display-4">Product Management</h2>
                <p>
                    <router-link to="/product/create">Add new</router-link>
                </p>
            </div>

            <div class="container">
                <div class="card-deck mb-3">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in products" :key="index">
                                <th scope="row">{{ product.id }}</th>
                                <td>{{ product.name }}</td>
                                <td>{{ product.price }}</td>
                                <td>
                                    <router-link :to="{ name: 'productEdit', params: { id: product.id } }">
                                        <button class="btn btn-primary mr-3">Edit</button>
                                    </router-link>
                                    <button class="btn btn-danger" @click="onDelete(product.id)">Delete</button>
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
            products: [],
        };
    },
    created() {
        this.getAll();
    },
    methods: {
        getAll() {
            this.$request.get(`${import.meta.env.VITE_APP_ROOT_API}/products`).then((res) => {
                console.log(res.data);
                this.products = res.data;
            });
        },

        onDelete(productId) {
            // library
            this.$swal
                .fire({
                    title: 'Do you want to delete?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.$request
                            .delete(`${import.meta.env.VITE_APP_ROOT_API}/products/${productId}`)
                            .then((res) => {
                                if (res.data.success) {
                                    this.$swal.fire('Deleted!', '', 'success');
                                    this.getAll();
                                }
                            });
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
