//EJEMPLO DE RUTAS MODULARES
export default [
  {
    path: '/crews',
    name: 'Crews',
    component: () => import('../views/CrewView.vue'),
    //    children: [
    //      {
    //        path: '',
    //        name: 'UserList',
    //        component: () => import('../views/HomeView.vue'),
    //      },
    //      {
    //        path: ':id',
    //        name: 'UserDetail',
    //        component: () => import('../views/HomeView.vue'),
    //      },
    //    ],
  },
]
