<template>
    <section>
        <h2>Example of isomorphic storage</h2>
        <div>
            <form @submit.prevent="remember">
                <input type="text" v-model="text">

                <button type="submit">Remember</button>
            </form>
        </div>
    </section>
</template>
<script>
export default {
    name: 'HomePage',
    data() {
        return {
            text: ''
        };
    },
    methods: {
        remember() {
            this.$store.dispatch('saveable/rememberText', { text: this.text });
        }
    },
    created() {
        this.text = this.$store.state.saveable.text;
    }
};
</script>
