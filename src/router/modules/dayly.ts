const { VITE_HIDE_HOME } = import.meta.env;

export default {
  path: "/daylyRecommand",
  redirect: "/daylyRecommand/list",
  meta: {
    icon: "ep/home-filled",
    title: "每日推荐",
    rank: 1
  },
  children: [
    {
      path: "/daylyRecommand/list",
      name: "daylyRecommandList",
      component: () => import("@/views/daylyRecommand/index.vue"),
      meta: {
        title: "每日推荐",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;
