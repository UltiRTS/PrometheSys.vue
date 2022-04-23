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

            <div class="loginbox" style="position: absolute; height: 100%; width: 100%; mix-blend-mode: screen;display:none;" id="loginbox">
			    <div style="position:absolute;top:45%;color:white;margin:0;left:30%;height:6vw;width:12vw;overflow:hidden;">
				    <div style="background:white;position:absolute;top:0;width:100%;height:2px;"></div>
				    <p id='prtsLOGO' class=""
					style="position:absolute;margin:0;top:0.5vw;font-family:JuneBug4;font-weight:900;font-size:2vw;">
					THEA </p>
				    <p id='prtsPharma' class='' style="position:absolute;margin:0;top:3vw;">PHARMACEUTICALS</p>

				    <div style="position:absolute;margin:0;font-size:1vw;width:100%;" class=''>
                        <span id="prtsOS">Analysis&nbsp;</span>
                        <span id="prtsOS1" style="font-weight:900;">OS</span>
                        <span id="prtsVer" style="font-size:0.6vw;position:absolute;right:0;top:4px">&nbsp;LTS BUILD
						V11.04</span>
                    </div>
				    <div class="" id='underlinePRTS' style="background:white;position:absolute;width:100%;height:2px;">
				    </div>
			    </div>
			    <div class="logininput" id="logininput" style="position:absolute;height:6vw;top:45%;filter: drop-shadow(10px 10px 2px rgba(255,255,255,0.5));z-index:1;">
				    <img src="assets/thea.png" style="position:absolute;width: 48%;/* height: 110%; */top: 21%;right: 1%;filter: invert(0.1);">
				    <p style="cursor: default;top:1.2vw;position:absolute;left:1.2vw;font-size:1.5vw;background-color:black;color:white;margin:0;padding:0;filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.5));">
					Dr.&nbsp;</p> 
                    <input id="usr" style="cursor: text;top:1.2vw;position:absolute;left:3.5vw;font-size:1.5vw; display: inline;border:none;outline:none;width:18vw;background: transparent;" type="text" placeholder="Name" name="uname" required="">

				    <input id="passwd" style="font-size:1.5vw;margin:0;cursor: text;top:3.2vw;position:absolute;left:1.2vw;border:none;outline:none;background: transparent;" type="password" placeholder="Password" name="psw" required="">

				    <p class="connect" onmouseover="pushToolTip('Press this [ button ] to [ login ]')" id="loginInputStatus"
					onclick="playFX('acknowledge.wav');logMeIn();this.onclick=''"
					style="cursor: pointer;top:3.2vw;position:absolute;/* left:16.2vw; */left:85%;font-size: 1vw;margin:0;color:black;font-weight:900;filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.5));">
					▶</p>
			    </div>

                <div
                    style="position:absolute;top:80%;left:30%;height:10vw;width:37vw;font-size:0.8vw;height:100%;overflow:hidden;">
                    <div class="button-block" style="position:absolute;top:0%;width:100%;" id="" onclick="rememberMe()">
                        <button style="width:100%;height:3vw;" id="rememberName" class=''>Persistent Neural Link</button>
                    </div>
                    <div class="button-block" style="position:absolute;top:4vw;width:100%;" onclick="registerMe()">
                        <button style="width:100%;height:3vw;" id="register" class=''>Register this Neural Link</button>
                    </div>
                </div>

                <div style="position:absolute;left:48%;height:6vw;top:45%;color:white;width:100%;overflow:hidden;display:none; "
                    class="welcomeMsg" id="welcomeMsg">
                    <div class='' id='welcomeHeading' style="font-size:6vw;display:none;top:-2vw;">歓迎</div>

                    <div id='welcomeUser' class='' style="font-size:3vw;position:absolute;display:none;">
                        <span style="font-size:3vw;font-weight:900;opacity:0.4">Dr. &nbsp;</span>
                    </div>

                    <div id='welcomeSubline1' style="font-size:0.5vw;position: absolute; top: 3vw;display:none;">
                        UDEV/URANDOM System Entropy: 100%</div>
                    <div id='welcomeSubline2' style="font-size:0.5vw;position: absolute; top: 3.5vw;display:none;">
                        INIT.RC Neural Connectivity: 100%</div>
                    <div id='welcomeSubline3' style="font-size:0.5vw;position: absolute; top: 4vw;display:none;">PAM
                        Authenticating</div>
                    <div id='welcomeSubline4' style="font-size:0.5vw;position: absolute; top: 4.5vw;display:none;">
                        Authority: 42</div>
                    <div id='welcomeSubline5' style="font-size:0.5vw;position: absolute; top: 5vw;display:none;">Neural
                        UART Logging In</div>

                </div>
            </div>
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