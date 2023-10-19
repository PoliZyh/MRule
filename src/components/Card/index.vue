<template>
    <div class="card-box">
        <div class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>


<script setup>

</script>


<style scoped lang="scss">
.card-box {
    width: 100%;
    height: 100%;
    border: 1px solid $border-c-week-grey;
    box-shadow: 0 10px 20px 5px rgba(217, 217, 217, 0.531);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.card-box:hover {
    box-shadow: 0 10px 20px 5px rgba(187, 187, 187, 0.531);
}
</style>