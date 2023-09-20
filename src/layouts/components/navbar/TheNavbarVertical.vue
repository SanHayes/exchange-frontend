<template>
  <div class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

        <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" />
        <vs-spacer />
        <feather-icon class="icon-audio" :icon="showAudio ? 'Volume2Icon': 'VolumeXIcon'" @click="open" />

        <i18n />

        <notification-drop-down />

        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import I18n from './components/I18n.vue';
import NotificationDropDown from './components/NotificationDropDown.vue';
import ProfileDropDown from './components/ProfileDropDown.vue';
import AuthenticationService from "@/services/AuthenticationService";

export default {
  name: 'the-navbar-vertical',
  data(){
    return {
      showAudio: false
    }
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  mounted(){
    // this.play();
  },
  components: {
    //Bookmarks,
    I18n,
    //SearchBar,
    //CartDropDown,
    NotificationDropDown,
    ProfileDropDown
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#011022' : this.navbarColor;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    textColor() {
      return { 'text-white': (this.navbarColor != '#011022' && this.$store.state.theme === 'dark') || (this.navbarColor != '#fff' && this.$store.state.theme !== 'dark') };
    },
    windowWidth() {
      return null;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == 'default') return 'navbar-default';
      else if (this.verticalNavMenuWidth == 'reduced') return 'navbar-reduced';
      else if (this.verticalNavMenuWidth) return 'navbar-full';
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
    },
    open(){
      this.showAudio = !this.showAudio;
      this.play();
    },
    play(){
      if(this.showAudio){
        AuthenticationService.getWithdrawalListHistory().then(res => {
          if(res.data.success === 1){
            let data = res.data.data.filter(v => v.status === 0);
            if(data.length){
              var synth = window.speechSynthesis;
              var voices = new window.SpeechSynthesisUtterance();
              voices.lang = "zh-CN";
              voices.text = `您有${data.length}条未处理的提现申请`;
              voices.onend = (event) => {
                  synth.cancel(voices);
              };
              window.speechSynthesis.speak(voices);
            }
          }
          setTimeout(() => {
            this.play();
          },10000)
        })
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.icon-audio{
  cursor: pointer;
  color: red;
  margin-right: 10px;
}
</style>
