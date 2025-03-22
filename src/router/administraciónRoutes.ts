//EJEMPLO DE RUTAS MODULARES
export default [
  {
    path: '/users',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: ':id',
        name: 'UserDetail',
        component: () => import('../views/HomeView.vue'),
      },
    ],
  },
]
