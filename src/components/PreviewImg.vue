<template>
    <div class="fullscreen">
        <div id="viewer"></div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { Viewer, utils } from '@photo-sphere-viewer/core';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/gallery-plugin/index.css';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, ref } from 'vue';
import test from '@/assets/room1.jpg'
import room2 from '@/assets/room2.jpg'
import room3 from '@/assets/room3.jpg'
import room4 from '@/assets/room4.jpg'
import address from '@/assets/address.png'
const store = useStore()

const imageUrl = computed(() => store.state.imageUrl)

// const showViewer = ref({})
var showViewer;
const animationValue = reactive({
    pitch: { start: -Math.PI / 2, end: 0.2 },
    yaw: { start: Math.PI, end: 0 },
    zoom: { start: 0, end: 50 },
    fisheye: { start: 2, end: 0 }
})
const handleChangeGallery = () => {
    console.log('更换图库')
}
const init = (imageUrl) => {
    showViewer = new Viewer({
        container: 'viewer',
        panorama: test,
        defaultZoomLvl: 0,
        plugins: [
            [GalleryPlugin, {
                items: [{
                    id: '1111',
                    name: '预览图',
                    panorama: test,
                    thumbnail: test,

                }, {
                    id: '222',
                    name: '预览图',
                    panorama: room2,
                    thumbnail: room2
                }

                ]
            }],
            [MarkersPlugin,
                {
                    markers: [
                        // {
                        //     id: 'circle',
                        //     position: { yaw: 6.169, pitch: 0.003 },
                        //     // image: address,
                        //     svgStyle: {
                        //         fill: 'rgba(255,255,0,0.3)',
                        //         stroke: 'yellow',
                        //         strokeWidth: '2px',
                        //     },
                        //     // longitude: -1.5,
                        //     // latitude: -0.28,
                        //     anchor: 'center right',
                        //     zoom: 10
                        //     // size: { width: 32, height: 32 },

                        // },
                        {
                            id: 'new-marker',
                            position: { yaw: 7.169, pitch: 0.003 },
                            image: address,
                            size: {
                                width: 32,
                                height: 32
                            },
                            anchor: 'bottom center'

                        },
                    ],
                }],
            // [VirtualTourPlugin, {
            //     positionMode: 'gps',
            //     renderMode: '3d',
            //     arrowStyle:
            //     {
            //         color: 0xaaaaaa,
            //         hoverColor: 0xaa5500,
            //         outlineColor: 0x000000,
            //         scale: [0.5, 2],

            //     }
            // }

            // ]
        ]
    })
    showViewer.addEventListener('ready', () => {
        showViewer.rotate({
            textureX: 1500,
            textureY: 1000
        });
    }, { once: true });
    const markersPlugin = showViewer.getPlugin(MarkersPlugin);

    markersPlugin.addEventListener('select-marker', (e, marker) => {
        // showViewer.animate({
        //     longitude: marker.config.longitude,
        //     latitude: marker.config.latitude,
        //     zoom: 100,
        //     speed: '-2rpm'
        // }).then(() => {
        //     showViewer.setPanorama(room2).then(() => {
        //         markersPlugin.updateMarker({
        //             id: marker.id,
        //             longitude: -1.8,
        //             latitude: -0.28
        //         }),
        //             showViewer.animate({
        //                 zoom: 50,
        //                 speed: '2rpx'
        //             }).then(() => {
        //                 room2 = room3
        //             })
        //     })
        // })
        console.log(marker)
        try {
            showViewer.setPanorama(room2).then(() => {
                markersPlugin.updateMarker({
                    id: marker.id,
                    position: { yaw: 8.169, pitch: 0.003 },
                })
                // showViewer.animate({
                //     zoom: 50,
                //     speed: '2rpx'
                // }).then(() => {
                //     room2 = room3
                // })
            })
        } catch (error) {
            console.log(error)
        }

        // if (marker.data?.generated) {
        //     if (doubleClick) {
        //         markersPlugin.removeMarker(marker);
        //     }
        // }
        // handleChangeGallery()
    });
    const virtualTour = showViewer.getPlugin(VirtualTourPlugin);
    showViewer.addEventListener('click', ({ data }) => {
        if (!data.rightclick) {
            // markersPlugin.addMarker({
            //     id: '#' + Math.random(),
            //     position: { yaw: data.yaw, pitch: data.pitch },
            //     image: address,
            //     size: { width: 32, height: 32 },
            //     anchor: 'bottom center',
            //     tooltip: '生成的定位点',
            //     data: {
            //         generated: true,
            //     },
            // });
        }
    });
    // virtualTour.setNodes([
    //     {
    //         id: '1',
    //         panorama: room2,
    //         thumbnail: room2,
    //         name: 'One',
    //         links: [{ nodeId: '2' }, { nodeId: '3' }],
    //         // markers: [markerLighthouse],
    //         gps: [-80.157, 25.667, 3],
    //         // position: { yaw: -0.45, pitch: -0.1 },
    //         panoData: { poseHeading: 327 },
    //     },
    //     {
    //         id: '2',
    //         panorama: test,
    //         thumbnail: test,
    //         name: 'Two',
    //         links: [{ nodeId: '1' }, { nodeId: '3' }],
    //         // markers: [markerLighthouse],
    //         gps: [-80.156479, 25.666725, 3],
    //         // position: {yaw:4.854955669699652, pitch: 0.10106037070927365},
    //         // panoData: { poseHeading: 327 },
    //     }, {
    //         id: '3',
    //         panorama: room3,
    //         thumbnail: room3,
    //         name: 'Three',
    //         links: [{ nodeId: '2' }, { nodeId: '1' }, { nodeId: '4' }],
    //         // markers: [markerLighthouse],
    //         gps: [-80.156479, 25.666725, 3],
    //         // position: { yaw: -0.45, pitch: -0.1 },
    //         panoData: { poseHeading: 327 },
    //     }, {
    //         id: '4',
    //         panorama: room4,
    //         thumbnail: room4,
    //         name: 'Four',
    //         links: [{ nodeId: '3' }, { nodeId: '1' }],
    //         // markers: [markerLighthouse],
    //         gps: [-80.156479, 25.666725, 3],
    //         // position: { yaw: -0.45, pitch: -0.1 },
    //         panoData: { poseHeading: 327 },
    //     }

    // ], '2')
    // virtualTour.addEventListener('node-changed', ({ node, data }) => {
    //     console.log(`Current node is ${node.id}`);
    //     console.log('node', node)
    //     console.log('data', data)
    //     if (data.fromNode) {
    //         // other data are available
    //         console.log(`Previous node was ${data.fromNode.id}`);
    //     }
    // });
}

const enteraAimation = () => {
    /*  _this.autorotatePlugin.stop(); */
    new utils.Animation({
        properties: animationValue,
        duration: 2500,
        easing: "inOutQuad",
        onTick: (properties) => {
            _this.viewer.setOption("fisheye", properties.fisheye);
            _this.viewer.rotate({ yaw: properties.yaw, pitch: properties.pitch });
            _this.viewer.zoom(properties.zoom);

        },
    }).then(() => {
        if (this.hasGallery) {
            this.galleryPlugin.setItems(this.imgList); //设置图库

        }
        /*  _this.autorotatePlugin.start(); */
    });
}
onMounted(() => {
    console.log('来了')
    init(imageUrl.value)
})


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