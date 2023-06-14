<template>
    <div class="container">
        <!-- <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/preview">预览页面</router-link></li>
            <li><router-link to="/token">Token 预览页面</router-link></li>
        </ul> -->
        <div class="title">请将全景图片链接放在下方，或点击s右侧按钮进行图片上传</div>
        <div class="buttons">
            <!-- <input type="text" v-model="localImageUrl" /> -->
            <button @click="preview">去新页面</button>
        </div>
        <!-- <div id="viewer"></div> -->

        <!-- <router-view></router-view> -->
    </div>
</template>

<script setup>
/* eslint-disable */
import { useStore } from 'vuex'
import { computed } from 'vue';
import { useRouter } from 'vue-router'



const store = useStore()
const router = useRouter()
const imageUrl = computed(() => store.state.imageUrl);

const localImageUrl = computed({
    get () {
        return imageUrl.value;
    },
    set (url) {
        store.commit('setImageUrl', url);
    }
});

const preview = () => {
    const url = encodeURIComponent(localImageUrl.value);
    console.log(router)
    console.log(url)
    router.push('Preview')
    // eslint-disable-next-line
    // const viewer = new Viewer({
    //     container: 'viewer',
    //     panorama: 'http://117.33.156.59:8005/sys-storage/download_image?f8s=bb2a46aed595b1fa0b7e2a9cbbf4702e',
    // });



};


</script>

<style scoped>
.container {
    background-color: black;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}

.title {
    font-size: 36px;
    margin-bottom: 20px;
}

.buttons {
    display: flex;
    align-items: center;
}

input[type="text"] {
    padding: 10px;
    font-size: 20px;
    width: 400px;
}

button {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    font-size: 20px;
    border: none;
    margin-left: 20px;
    cursor: pointer;
}

button:hover {
    background-color: darkblue;
}
</style>