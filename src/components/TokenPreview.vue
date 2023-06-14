<template>
    <div class="fullscreen">
        <div id="viewer"></div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { Viewer } from '@photo-sphere-viewer/core';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/gallery-plugin/index.css';
/* eslint-disable */
export default {
    setup () {
        // 定义全景图容器的引用
        const viewerRef = ref(null);

        onMounted(() => {
            // 获取 url 中的 token
            const searchParams = new URLSearchParams(window.location.search);
            const token = searchParams.get('token');

            // 获取 imageUrl
            // const imageUrl = `http://117.33.156.59:8005/sys-storage/download_image?f8s=${token}`;
            const imageUrl = 'http://117.33.156.59:8005/sys-storage/download_image?f8s=bb2a46aed595b1fa0b7e2a9cbbf4702e'
            // 初始化全景图
            // eslint-disable-next-line
            const viewer = new Viewer({
                container: 'viewer',
                panorama: imageUrl,
            });

            // 调整全景图大小
            window.addEventListener('resize', () => {
                viewer.setSize();
            });
            console.log('来了吗')
        });

        return {
            viewerRef,
        };
    },
};
</script>
  
<style>
.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#viewer {
    width: 100%;
    height: 100%;
}
</style>
  