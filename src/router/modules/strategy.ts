const { VITE_HIDE_HOME } = import.meta.env;

export default {
  path: "/strategy",
  redirect: "/strategy/list",
  meta: {
    icon: "ep/home-filled",
    title: "策略",
    rank: 1
  },
  children: [
    {
      path: "/strategy/list",
      name: "strategyList",
      component: () => import("@/views/strategy/index.vue"),
      meta: {
        title: "策略",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    },
    {
      path: "/strategy/:name",
      name: "strategyDetail",
      component: () => import("@/views/strategy/detail.vue"),
      meta: {
        title: "策略详情",
        showLink: false
      }
    },
    {
      path: "/strategy/:name/:id",
      name: "strategyDetailById",
      component: () => import("@/views/strategy/orderDetail.vue"),
      meta: {
        title: "订单详情",
        showLink: false
      }
    }
  ]
} satisfies RouteConfigsTable;
