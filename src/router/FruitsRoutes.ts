//EJEMPLO DE RUTAS MODULARES
export default [
  {
    path: '/fruits',
    name: 'Fruits',
    component: () => import('../views/FruitsView.vue'),
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
