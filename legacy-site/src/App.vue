<script setup>
    import AppHeader from './components/AppHeader.vue';
    import AppFooter from './components/AppFooter.vue';
</script>

<template>
    <div>
        <AppHeader/>

        <!-- <div class="overflow-hidden mt-16"></div> -->
        <div class="overflow-hidden">
            <router-view />
        </div>

        <AppFooter/>
    </div>
</template>
