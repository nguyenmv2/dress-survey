<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/survey">Survey</router-link> |
      <router-link to="/images">Images</router-link> |
      <template v-if="isLoggedIn">
        Hello {{ username }}.
        <a href="#" @click="triggerNetlifyIdentityAction('logout')">
          Logout
        </a>
      </template>
      <template v-else>
        <a href="#" @click="triggerNetlifyIdentityAction('login')">
          Login
        </a>
      </template>
    </div>
    <router-view />
  </div>
</template>
<script>
import store from "@/store";
import router from "@/router";
import { provideRouter, provideStore } from "@/helpers/injectors";
import { onMounted, computed } from "@vue/composition-api";
import netlifyIdentity from "netlify-identity-widget";

export default {
  setup() {
    onMounted(() => {
      netlifyIdentity.init({
        APIUrl: "https://dreamy-pike-d1c90a.netlify.com/.netlify/identity",
        logo: true
      });
      const loggedInUser = netlifyIdentity.currentUser();
      if (loggedInUser) {
        store.commit("SET_CURRENT_USER", toUserObj(loggedInUser));
      }
    });
    provideRouter(router);
    provideStore(store);
    const currentUser = computed(() => store.getters.user);
    const isLoggedIn = computed(() => !!currentUser.value);
    const username = computed(() =>
      isLoggedIn ? currentUser.value.username : ""
    );
    function toUserObj(user) {
      return {
        username: user.user_metadata.full_name,
        email: user.email,
        access_token: user.token.access_token,
        expires_at: user.token.expires_at,
        refresh_token: user.token.refresh_token,
        token_type: user.token.token_type
      };
    }
    function triggerNetlifyIdentityAction(action) {
      if (action == "login") {
        const loggedInUser = netlifyIdentity.currentUser();
        // eslint-disable-next-line
        console.log(loggedInUser)
        if (loggedInUser) {
          store.commit("SET_CURRENT_USER", toUserObj(loggedInUser));
        } else {
          netlifyIdentity.open("login");
          netlifyIdentity.on("login", user => {
            store.commit("SET_CURRENT_USER", toUserObj(user));
            netlifyIdentity.close();
          });
        }
      } else if (action == "logout") {
        store.commit("SET_CURRENT_USER", null);
        netlifyIdentity.logout();
      }
    }
    return {
      currentUser,
      username,
      isLoggedIn,
      triggerNetlifyIdentityAction
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
