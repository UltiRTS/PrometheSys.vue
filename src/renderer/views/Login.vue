<template>
    <div style='display:none;'>
        <div>{{ userState }}</div>

        <div>{{ username }}</div>
        <div>{{ password }}</div>
        <input type="text" v-model="username">
        <input type="password" v-model="password">
        <button @click="login({username, password})">Login</button>
    </div>
    <div style="position:absolute;width:100%;height:100%;top:0%;left:0%;background: #000;"></div>
    <div id='mainContent' class='mainContent' >
        <div style="position:absolute;width:100%;height:100%;top:0%;left:0%;background: #95928a;"></div>
        <img src="public/imgs/bg.png" style="position: absolute;width: 100%;height: 100%;left: 0%;top: 0%;filter: grayscale(100%) contrast(22%) brightness(99%);-webkit-mask-image: linear-gradient(rgb(80 80 80 / 0%), rgb(0, 0, 0));">
    
        <div id="cover" v-bind:class="{cover:yijingqichuang}" style="width: 43%; height: 20%; top: 33%; left: 27%; position: absolute;">
            <img src="public/imgs/thea_frame.png" style="position: absolute;width: 11vw;filter: drop-shadow(8px 20px 16px #000);">
        
            <a id="preClick" class="edgy-link" :class='yijingqichuang' @click='qichuangdachenggong()' style="filter: drop-shadow(rgb(0, 0, 0) 8px 20px 16px); position: absolute; margin: 2vw; top: -4%; left: 5vw; font-size: 2vw;color:white;">
                <span  style="font-family: font6;position: relative;opacity: 0.95;left: 0vw;font-weight: 900;color: grey;"> 目覚め始める </span>
                <span  style="font-family: font8;position: relative;opacity: 0.95;left: -12.45vw;"> 目覚め始める </span>
            </a>

            <div id='postClick'>
                <div v-if="yijingqichuang" class='theaTitle' style='position:absolute;font-family:font2;top:9%;left:19%;font-size:2vw;color:white;opacity:0;' >THEA,</div>
                <div v-if="yijingqichuang" class='theaTitle2' style='position:absolute;font-family:font2;top:29%;%;opacity:0;font-size:1.2vw;left:19%;color:white;'>INC.</div>
            </div>



        </div>

        <div id='loginInterface'>
            <img src='public/imgs/thea_auth.png' v-bind:class="{loginInterface_bgWaterMark:yijingqichuang}" style='opacity:0.00; position: absolute;width: 50vw;top: 70%; '>
        </div>
        <div style="position: absolute; top: 93%; left: 44%; font-family: font1; font-size: 1.5vh; color: white;">© THEA Pharmaceuticals, Inc.

        </div>
    </div>

</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            yijingqichuang:'',
        }
    },

    methods: {
        ...mapActions(['login']),
        qichuangdachenggong(){
            this.yijingqichuang='qichuangyijingchenggong';
            // console.log('setting var');
        },

        
    },
    computed: {
        ...mapState(['userState']),
    },


}
</script>


<style scoped>
@keyframes mainContent {
    0% {
        opacity: 0;
    }

    30% {
        opacity: 0;
    }

    75% {
        opacity: 1;
        visibility:hidden;
    }

    98% {
        width:2vw;
    }
    99% {
        width:0vw;
    }


}

/* The element to apply the animation to */
.mainContent {
    animation-name: mainContent;
    animation-duration: 4s;
    animation-fill-mode: forwards;
}

@keyframes theaVanish {
    0% {
        opacity: 1;
    }


    100% {
        left:25%;
        opacity: 0;
    }



}
.cover{
    animation-delay: 2.4s;
    animation-name: theaVanish;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes loginInterface_bgWaterMark {
    0% {
        left: -3%;
        opacity:0.00;
    }


    100% {
        left: -5%;
        opacity:0.05;
    }



}
.loginInterface_bgWaterMark{
    
    animation-delay: 3s;
    animation-name: loginInterface_bgWaterMark;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

@keyframes theaTitle {
    0% {
        opacity: 0;
    }

    30% {
        opacity: 1;
    }

    60% {
        opacity: 0;
        
    }

    100% {
        opacity: 1;
    }



}
.theaTitle{
    
    animation-name: theaTitle;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-delay: 0.75s;
}

.theaTitle2{
    
    animation-name: theaTitle;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-delay: 0.80s;
}

.qichuangyijingchenggong{
    animation: qichuangyijingchenggong 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.95, 0, 0.24, 0.88);
}

 @keyframes qichuangyijingchenggong {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        left:-2.5vw;
    }
 }

.edgy-link {
	 position: relative;
}
 .edgy-link span {
	 position: relative;
	 z-index: 999;
}
 .edgy-link::after {
	 content: "";
	 position: absolute;
	 width: 0;
	 height: 100%;
	 background: rgba(255, 255, 255, .5);
	 top: 0;
	 left: 0;
	 transition: all 0.55s ease;
}
 .edgy-link::before {
	 content: "";
	 position: absolute;
	 width: 0;
	 height: 100%;
	 background: rgba(255, 255, 255, 1);
	 top: 0;
	 left: 0;
	 transition: all 0.35s ease;
}
 .edgy-link:hover span {
	 color: #001d3c;
}
 .edgy-link:hover::after {
	 width: 100%;
	 transition: all 0.35s ease;
}
 .edgy-link:hover::before {
	 width: 100%;
	 transition: all 0.55s ease;
}
 

</style>