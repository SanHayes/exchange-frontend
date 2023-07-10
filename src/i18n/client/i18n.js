import Vue from 'vue'
import VueI18n from 'vue-i18n'
import i18nData from './i18nData'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'vi', // set default locale
  messages: i18nData,
})

export default i18n

export function $t(args) {
  return i18n.tc.call(i18n, args);
}