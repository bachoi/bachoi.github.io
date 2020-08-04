<template>    
    <div style="text-align:left">
        <h1>{{title}}</h1>
        <br/>
        <router-link to="/new">Add new food item</router-link>
        <br/><br/>
        <table>
            <thead>
                <tr style="font-weight:bold">
                    <td style="width:400px">Название</td>
                    <td style="width:100px">Вес, гр</td>
                    <td style="width:100px">Цена, руб.</td>
                    <td style="width:100px"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="menuItem in menu">
                    <td><a href="#" v-on:click="gotoMenuItemEdit(menuItem)">{{menuItem.name}}</a></td>
                    <td>{{menuItem.weight}}</td>
                    <td>{{menuItem.price}}</td>
                    <td><button value="Удалить" v-on:click="deleteMenuItem(menuItem)">Удалить</button></td>
                </tr>
            </tbody>
        </table>
    </div>    
</template>

<script>
    export default
        {
            name: 'MenuList',
            props: ["title"],
            data: function() {
                return {
                    "menu": []
                }
            },

            mounted() {
                axios
                    .get('http://localhost:3000/menu')
                    .then(response => (this.menu = response.data))
                    .catch(error => console.log(error));
            },

            methods: {
                gotoMenuItemEdit: function (menuItem) {
                    this.$router.push(`/menulist/${menuItem.id}/edit`);
                },

                deleteMenuItem: function (menuItem) {
                    if (window.confirm(`Удалить данное блюдо \"${menuItem.name}\"из списка?`)) {
                        axios
                            .delete('http://localhost:3000/menu/' + menuItem.id)
                            .then(this.menu = this.menu.filter(function (item) { return item.id !== menuItem.id }))
                            .catch(error => console.log(error));
                    }
                }
            }
        }
</script>