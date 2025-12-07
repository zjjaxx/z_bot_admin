const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Block",
  component: Layout,
  redirect: "/block",
  meta: {
    icon: "ep/home-filled",
    title: "板块",
    rank: 0
  },
  children: [
    {
      path: "/block",
      name: "block",
      component: () => import("@/views/block/index.vue"),
      meta: {
        title: "板块",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;
