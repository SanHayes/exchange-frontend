<template>
  <div class="parentx">
    <vs-sidebar
      class="c-sidebar v-nav-menu items-no-padding"
      v-model="isVerticalNavMenuActive"
      ref="verticalNavMenu"
      default-index="-1"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
      :parent="parent"
      :hiddenBackground="clickNotClose"
      :reduce="reduce"
      v-hammer:swipe.left="onSwipeLeft"
    >
      <div @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <!-- Header -->
        <div
          class="header-custom header-sidebar flex items-end justify-between"
          slot="header"
        >
          <template v-if="showCloseButton">
            <span>
                  <svg
                      @click="$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)"
                      class="xl:hidden cursor-pointer"
                      data-v-b495ff56=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.944"
                      height="19.953"
                      viewBox="0 0 23.944 19.953"
                  >
              <g data-v-b495ff56="" id="menu-4" transform="translate(0 -1)">
                <path
                    data-v-b495ff56=""
                    id="Path_29261"
                    data-name="Path 29261"
                    d="M21.949,5H2A2,2,0,0,0,2,8.991H21.949a2,2,0,1,0,0-3.991Z"
                    transform="translate(0 3.981)"
                    fill="#fff"
                ></path>
                <path
                    data-v-b495ff56=""
                    id="Path_29262"
                    data-name="Path 29262"
                    d="M21.949,1H2A2,2,0,0,0,2,4.991H21.949a2,2,0,1,0,0-3.991Z"
                    fill="#fff"
                ></path>
                <path
                    data-v-b495ff56=""
                    id="Path_29263"
                    data-name="Path 29263"
                    d="M9.977,9H2a2,2,0,0,0,0,3.991H9.977A2,2,0,1,0,9.977,9Z"
                    transform="translate(0 7.963)"
                    fill="#fff"
                ></path>
              </g>
            </svg>
            </span>
<!--            <feather-icon
              icon="fe-bar"
              class="m-0 cursor-pointer logo-x"
              @click="$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)"
            />-->
          </template>
<!--          <router-link
            tag="div"
            class="vx-logo cursor-pointer flex items-center mx-auto"
            :to="{name: 'client-index'}"
          >
            <img
              class="logo"
              width="120"
              alt=""
              :src="require('@/assets/images/logo/logo.png')"
            />
            <span
              class="vx-logo-text text-primary"
              v-show="isMouseEnter || !reduce"
              v-if="title"
              >{{ title }}</span
            >
          </router-link>-->
        </div>

        <list-menu-handmade />
      </div>
    </vs-sidebar>

    <div
      v-if="!isVerticalNavMenuActive"
      class="v-nav-menu-swipe-area"
      v-hammer:swipe.right="onSwipeAreaSwipeRight"
    />
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
//import VNavMenuGroup from './VerticalNavMenuGroup.vue'
//import VNavMenuItem from './VerticalNavMenuItem.vue'
import ListMenuHandmade from "./ListMenu.vue";

// import Logo from "../Logo.vue"

export default {
  name: "v-nav-menu",
  components: {
    //VNavMenuGroup,
    //VNavMenuItem,
    ListMenuHandmade,
    VuePerfectScrollbar,
    // Logo
  },
  props: {
    //logo:             { type: String },
    openGroupHover: { type: Boolean, default: false },
    parent: { type: String },
    reduceNotRebound: { type: Boolean, default: true },
    navMenuItems: { type: Array, required: true },
    title: { type: String },
  },
  data: () => ({
    iSLogin: false,
    clickNotClose: false, // disable close navMenu on outside click
    isMouseEnter: false,
    reduce: false, // determines if navMenu is reduce - component property
    showCloseButton: true, // show close button in smaller devices
    settings: {
      // perfectScrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true,
    },
    showShadowBottom: false,
  }),
  computed: {
    isGroupActive() {
      return (item) => {
        const path = this.$route.fullPath;
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined;
        let open = false;
        let func = (item) => {
          if (item.submenu) {
            item.submenu.forEach((item) => {
              if (
                item.url &&
                (path === item.url || routeParent === item.slug)
              ) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };
        func(item);
        return open;
      };
    },
    menuItemsUpdated() {
      let clone = this.navMenuItems.slice();

      for (let [index, item] of this.navMenuItems.entries()) {
        if (item.header && item.items.length && (index || 1)) {
          let i = clone.findIndex((ix) => ix.header === item.header);
          for (let [subIndex, subItem] of item.items.entries()) {
            clone.splice(i + 1 + subIndex, 0, subItem);
          }
        }
      }

      return clone;
    },
    isVerticalNavMenuActive: {
      get() {
        return this.$store.state.isVerticalNavMenuActive;
      },
      set(val) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", val);
      },
    },
    layoutType() {
      return this.$store.state.mainLayoutType;
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_BUTTON", val);
      },
    },
    isVerticalNavMenuReduced() {
      return Boolean(this.reduce && this.reduceButton);
    },
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  watch: {
    isVerticalNavMenuActive(val) {
      this.$store.commit("SET_IS_SCROLL_TRADING", val);
      if (!val) {
        this.$store.commit("SET_IS_SCROLL_TRADING", true);
      }
    },
    $route() {
      let token = localStorage.hasOwnProperty("tokenUser");
      if (token) {
        this.iSLogin = true;
      } else {
        this.iSLogin = false;
      }
      if (this.isVerticalNavMenuActive && this.showCloseButton)
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
    },
    reduce(val) {
      const verticalNavMenuWidth = val
        ? "reduced"
        : this.$store.state.windowWidth < 1200
        ? "no-nav-menu"
        : "default";
      this.$store.dispatch("updateVerticalNavMenuWidth", verticalNavMenuWidth);

      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    layoutType() {
      this.setVerticalNavMenuWidth();
    },
    reduceButton() {
      this.setVerticalNavMenuWidth();
    },
    windowWidth() {
      this.setVerticalNavMenuWidth();
    },
  },
  methods: {
    // handleWindowResize(event) {
    //   this.windowWidth = event.currentTarget.innerWidth;
    //   this.setVerticalNavMenuWidth()
    // },
    onSwipeLeft() {
      if (this.isVerticalNavMenuActive && this.showCloseButton)
        this.isVerticalNavMenuActive = false;
    },
    onSwipeAreaSwipeRight() {
      if (!this.isVerticalNavMenuActive && this.showCloseButton)
        this.isVerticalNavMenuActive = true;
    },
    psSectionScroll() {
      this.showShadowBottom =
        this.$refs.verticalNavMenuPs.$el.scrollTop > 0 ? true : false;
    },
    mouseEnter() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);
      this.isMouseEnter = true;
    },
    mouseLeave() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", true);
      this.isMouseEnter = false;
    },
    setVerticalNavMenuWidth() {
      if (this.windowWidth > 1200) {
        if (this.layoutType === "vertical") {
          // Set reduce
          this.reduce = this.reduceButton ? true : false;

          // Open NavMenu
          this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);

          // Set Menu Items Only Icon Mode
          const verticalNavMenuItemsMin =
            this.reduceButton && !this.isMouseEnter ? true : false;
          this.$store.commit(
            "UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN",
            verticalNavMenuItemsMin
          );

          // Menu Action buttons
          this.clickNotClose = true;
          this.showCloseButton = false;

          const verticalNavMenuWidth = this.isVerticalNavMenuReduced
            ? "reduced"
            : "default";
          this.$store.dispatch(
            "updateVerticalNavMenuWidth",
            verticalNavMenuWidth
          );

          return;
        }
      }

      // Close NavMenu
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);

      // Reduce button
      if (this.reduceButton) this.reduce = false;

      // Menu Action buttons
      this.showCloseButton = true;
      this.clickNotClose = false;

      // Update NavMenu Width
      this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");

      // Remove Only Icon in Menu
      this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);
    },
    toggleReduce(val) {
      this.reduceButton = val;
      this.setVerticalNavMenuWidth();
    },
  },
  mounted() {
    this.setVerticalNavMenuWidth();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/verticalNavMenu.scss";

@media screen and (min-width: 968px) {
  .c-sidebar {
    & > div {
      .header-custom {
        display: none !important;
      }
      width: 105px !important;
      margin-top: 64.8px;
      padding-top: 20px;
    }
  }
}

.c-sidebar {
  & > div {
    background: #02142b!important;
    width: 105px;
    max-width: 309px;
  }
}

#content-area.content-area-reduced {
  margin-left: 0;
}

.header-custom {
  padding: 0 1.2rem !important;
  //margin-bottom: 25px;
  height: 60px;
  display: flex;
  align-items: center !important;
  justify-content: flex-start !important;
}

.logo-x,
.logo-x svg {
  width: 55px !important;
  height: 55px !important;
}

.v-nav-menu {
  .logo {
    height: auto;
    object-fit: cover;
  }
}
</style>
<style>
@media screen and (max-width: 968px) {
  .vx-logo {
    display: none;
  }
}
</style>
