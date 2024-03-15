<template>
    <div>
        <div class="product-info">
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h3 class="display-5">Product Infomation</h3>
                <router-link to="/product">Back</router-link>
            </div>

            <div class="container">
                <form @submit.prevent="save()">
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Product name</label>
                        <div class="col-sm-9">
                            <input
                                type="text"
                                class="form-control"
                                v-model="product.name"
                                @blur="validate"
                                v-bind:class="{ 'is-invalid': errors.name }"
                            />
                            <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Product price</label>
                        <div class="col-sm-9">
                            <input
                                type="text"
                                class="form-control"
                                v-model="product.price"
                                @blur="validate"
                                v-bind:class="{ 'is-invalid': errors.price }"
                            />
                            <div class="invalid-feedback" v-if="errors.price">{{ errors.price }}</div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Product description</label>
                        <div class="col-sm-9">
                            <textarea
                                class="form-control"
                                rows="3"
                                v-model="product.description"
                                @blur="validate"
                                v-bind:class="{ 'is-invalid': errors.description }"
                            ></textarea>
                            <div class="invalid-feedback" v-if="errors.description">{{ errors.description }}</div>
                        </div>
                    </div>
                    <!-- test -->
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Test</label>
                        <div class="col-sm-9">
                            <input class="form-control" rows="3" v-model="test.test" />
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
                price: '',
                description: '',
            },
            product: {
                name: '',
                price: '',
                description: '',
            },
            test: {
                test: '',
            },
        };
    },
    created() {
        let productId = this.$route.params.id;
        if (productId) {
            this.getProduct(productId);
        }
    },
    methods: {
        validate() {
            let isValid = true;

            this.errors = {
                name: '',
                price: '',
                description: '',
            };

            if (!this.product.name) {
                this.errors.name = 'Product name is required';
                isValid = false;
            }
            if (!this.product.price) {
                this.errors.price = 'Product price is required';
                isValid = false;
            } else if (!this.isNumber(this.product.price)) {
                this.errors.price = 'Product price is not a number';
                isValid = false;
            }
            if (!this.product.description) {
                this.errors.description = 'Product description is required';
                isValid = false;
            }
            return isValid;
        },

        isNumber(value) {
            return /^\d*$/.test(value);
        },

        mounted() {
            console.log('check import.meta.env.VITE_APP_ROOT_API', import.meta.env.VITE_APP_ROOT_API);
        },

        save() {
            this.validate();
            console.log(this.errors);
            console.log('test', this.test.test);
            console.log('check import.meta.env.VITE_APP_ROOT_API', import.meta.env.VITE_APP_ROOT_API);

            //edit
            if (this.validate()) {
                if (this.product.id) {
                    this.$request
                        // .put(`http://localhost:8000/api/products/${this.product.id}`, this.product)
                        .put(`${import.meta.env.VITE_APP_ROOT_API}/products/${this.product.id}`, this.product)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.success) {
                                this.$router.push({
                                    name: 'productList',
                                });
                                return;
                            }
                            alert('Something went wrong');
                        });
                    return;
                }

                //call api
                //create
                console.log('product', this.product);
                this.$request.post(`${import.meta.env.VITE_APP_ROOT_API}/products`, this.product).then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        this.$router.push({
                            name: 'productList',
                        });
                        return;
                    }
                    alert('Something went wrong');
                });
            }
        },

        getProduct(productId) {
            this.$request.get(`${import.meta.env.VITE_APP_ROOT_API}/products/${productId}`).then((res) => {
                this.product = res.data;
            });
        },

        cancel() {
            (this.product.name = ''), (this.product.price = ''), (this.product.description = '');
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
