// NOTE
// Please use your own firebase details below. For more details visit: https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html

import Vue from "vue";
import {initializeApp} from 'firebase/app'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBLkwTvPIH1RCuYSDdB-CLv-NTqL8lKBE8",
    authDomain: "trade-bo.firebaseapp.com",
    projectId: "trade-bo",
    storageBucket: "trade-bo.appspot.com",
    messagingSenderId: "497765536975",
    appId: "1:497765536975:web:0e5eb442fd1fce731453ba"
};


Vue.config.productionTip = false;

initializeApp(config);
