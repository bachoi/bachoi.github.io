<template>
    <div style="text-align:center; margin:0 auto">
        <h1>Редактирование блюда</h1>

        <table style="width:50%; margin:0 auto">
            <tr>
                <td style="width:20%">Название</td>
                <td style="width:80%"><input ref="name" type="text" v-model="menuItem.name" style="width:100%"></td>
            </tr>
            <tr>
                <td>Описание</td>
                <td><input ref="description" type="text" v-model="menuItem.description" style="width:100%"></td>
            </tr>
            <tr>
                <td>Вес, кг</td>
                <td><input ref="weight" type="number" v-model.number="menuItem.weight" style="width:100%"></td>
            </tr>
            <tr>
                <td>Цена, руб.</td>
                <td><input ref="price" type="number" v-model.number="menuItem.price" style="width:100%"></td>
            </tr>
        </table>
        <br /><br />
        <div style="text-align:center; width: 50%; margin:0 auto">
            <input type="button" value="Сохранить" style="margin-right:30px" v-on:click="save()"/>
            <router-link to="/MenuList"><input type="button" value="Отмена"/></router-link>
        </div>
    </div>
</template>



<script>

    export default {
        data: function () {
            return {
                menuItem: {
                    name: "",
                    description: "",
                    weight: null,
                    price: null
                }
            }
        },

        mounted() {
            if (this.$route.params.id) {            
                    axios.get("http://localhost:3000/menu/" + this.$route.params.id)
                        .then(response => (this.menuItem = response.data))
                        .catch(error => console.log(error));
            }
        },

        methods: {
            save: function () {
                if (!this.$refs.name) {
                    window.alert("Введите название блюда!");
                    return;
                }

                if (!this.$refs.weight) {
                    window.alert("Введите вес блюда!");
                    return;
                }

                if (!this.$refs.price) {
                    window.alert("Введите стоимость блюда!");
                    return;
                }

                
                if (this.menuItem.id) {
                    axios.patch("http://localhost:3000/menu/" + this.$route.params.id, this.menuItem)
                        .then((response) => { this.menuItem = response.data; this.$router.push("/MenuList"); })
                        .catch(error => (console.log(error)));
                }
                else {
                    this.menuItem.id = 0;
                    axios.post("http://localhost:3000/menu", this.menuItem)
                        .then((response) => { this.menuItem = response.data; this.$router.push("/MenuList"); })
                        .catch(error => (console.log(error)));
                }
                
            }
        }
    }
</script>