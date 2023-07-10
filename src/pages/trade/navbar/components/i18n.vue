<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center i18n-locale">
      <img class="h-4 w-5" :src="i18n_locale_img" :alt="$i18n.locale" />
      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updateLocale('vi')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/vi.png" alt="vi" /> &nbsp;Tiếng Việt</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('en')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English</vs-dropdown-item>
      <!-- <vs-dropdown-item @click="updateLocale('fr')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/fr.png" alt="fr" /> &nbsp;French</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('de')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/de.png" alt="de" /> &nbsp;German</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('pt')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/pt.png" alt="pt" /> &nbsp;Portuguese</vs-dropdown-item> -->

      <!--  -->
      <vs-dropdown-item @click="updateLocale('ja')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/ja.png" alt="ja" /> &nbsp;日本</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('kr')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/kr.png" alt="kr" /> &nbsp;한국어</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('cn')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/cn.png" alt="cn" /> &nbsp;中国</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('cam')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/cam.png" alt="cam" /> &nbsp;ប្រទេសកម្ពុជា</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('thai')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/thai.png" alt="thai" /> &nbsp;Thai</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('indo')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/indo.png" alt="indo" /> &nbsp;Indonesian</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('lao')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/lao.png" alt="lao" /> &nbsp;Lao</vs-dropdown-item>
    
    
    
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  computed: {
    i18n_locale_img() {
      return require(`@/assets/images/flags/${this.$i18n.locale}.png`)
    },
    getCurrentLocaleData() {
        const locale = this.$i18n.locale;
        if (locale == "vi")      return { flag: "vi", lang: 'Tiếng Việt' }
        else if (locale == "en") return { flag: "us", lang: 'English' }
        // else if (locale == "pt") return { flag: "br", lang: 'Portuguese' }
        // else if (locale == "fr") return { flag: "fr", lang: 'French'     }
        // else if (locale == "de") return { flag: "de", lang: 'German'     }

        else if (locale == "ja") return { flag: "ja", lang: '日本' }
        else if (locale == "kr") return { flag: "kr", lang: '한국어' }
        else if (locale == "cn") return { flag: "cn", lang: '中国' }

        else if (locale == "cam") return { flag: "cam", lang: 'ប្រទេសកម្ពុជា' }
        else if (locale == "thai") return { flag: "thai", lang: 'Thai'   }
        else if (locale == "indo") return { flag: "indo", lang: 'Indonesian'  }
        else if (locale == "lao") return { flag: "lao", lang: 'Lao' }
    },
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
  }
}
</script>

<style>
.con-vs-dropdown--menu{
    z-index: 99999;
}
</style>
