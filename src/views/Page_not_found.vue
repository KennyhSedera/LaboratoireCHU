<template>
    <div>
        Not found
    </div>
</template>
<script>
export default {
    mounted() {
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
    },
}
</script>