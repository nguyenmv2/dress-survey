import { provide, inject } from "@vue/composition-api";

const StoreSymbol = Symbol("Vuex");
const RouterSymbol = Symbol("VueRouter");

export function provideStore(store) {
  provide(StoreSymbol, store);
}
export function injectStore() {
  return inject(StoreSymbol);
}

export function provideRouter(router) {
  provide(RouterSymbol, router);
}

export function injectRouter() {
  return inject(RouterSymbol);
}
