// Sidebar Routers
export const category1 = [
  {
    action: 'ti-dashboard',
    title: 'dashboard',
    items: [
      { title: 'dashboardv1', path: '/dashboard/dashboard-v1' },
      { title: 'dashboardv2', path: '/dashboard/dashboard-v2' }
    ]
  },
  {
    action: 'ti-layers',
    title: 'pages',
    items: [
      { title: 'gallery', path: '/pages/gallery' },
      { title: 'pricing', path: '/pages/pricing' },
      { title: 'blank', path: '/pages/blank' }
    ]
  },
  {
    action: 'ti-timer',
    title: 'session',
    items: [
      { title: 'signUp', path: '/session/sign-up' },
      { title: 'login', path: '/session/login' },
      { title: 'lockScreen', path: '/session/lock-screen' }
    ]
  }
]

export const category2 = [
  {
    action: 'ti-layout',
    title: 'uiElements',
    items: [
      { title: 'buttons', path: '/ui-elements/buttons' },
      { title: 'cards', path: '/ui-elements/cards' },
      { title: 'checkbox', path: '/ui-elements/checkbox' },
      { title: 'carousel', path: '/ui-elements/carousel' },
      { title: 'chips', path: '/ui-elements/chips' },
      { title: 'datepicker', path: '/ui-elements/datepicker' },
      { title: 'dialog', path: '/ui-elements/dialog' },
      { title: 'grid', path: '/ui-elements/grid' },
      { title: 'input', path: '/ui-elements/input' },
      { title: 'list', path: '/ui-elements/list' },
      { title: 'menu', path: '/ui-elements/menu' },
      { title: 'progress', path: '/ui-elements/progress' },
      { title: 'radio', path: '/ui-elements/radio' },
      { title: 'select', path: '/ui-elements/select' },
      { title: 'slider', path: '/ui-elements/slider' },
      { title: 'snackbar', path: '/ui-elements/snackbar' },
      { title: 'tabs', path: '/ui-elements/tabs' },
      { title: 'toolbar', path: '/ui-elements/toolbar' },
      { title: 'tooltip', path: '/ui-elements/tooltip' },
      { title: 'timepicker', path: '/ui-elements/timepicker' }
    ]
  },
  {
    action: 'ti-comment-alt',
    title: 'forms',
    items: [
      { title: 'formValidation', path: '/forms/form-validation' },
      { title: 'stepper', path: '/forms/stepper' }
    ]
  },
  {
    action: 'ti-pie-chart',
    title: 'charts',
    items: [
      { title: 'vueChartjs', path: '/charts/vue-chartjs' },
      { title: 'vueEcharts', path: '/charts/vue-echarts' }
    ]
  },
  {
    action: 'ti-star',
    title: 'icons',
    items: [
      { title: 'themify', path: '/icons/themify' },
      { title: 'material', path: '/icons/material' }
    ]
  },
  {
    action: 'ti-layout',
    title: 'tables',
    items: [
      { title: 'standard', path: '/tables/standard' },
      { title: 'slots', path: '/tables/slots' },
      { title: 'selectable', path: '/tables/selectablerows' },
      { title: 'searchRow', path: '/tables/searchwithtext' }
    ]
  },
  {
    action: 'ti-map-alt',
    title: 'maps',
    items: [
      { title: 'googleMaps', path: '/maps/google-maps' },
      { title: 'leafletMaps', path: '/maps/leaflet-maps' },
      { title: 'jvectorMap', path: '/maps/jvector-map' }
    ]
  }
]

export const category3 = [
  {
    action: 'ti-email',
    title: 'inbox',
    items: null,
    path: '/inbox'
  },
  {
    action: 'ti-user',
    title: 'users',
    items: [
      { title: 'userProfile', path: '/users/user-profile' },
      { title: 'usersList', path: '/users/users-list' }
    ]
  },
  {
    action: 'ti-calendar',
    title: 'calendar',
    items: null,
    path: '/calendar'
  }
]

export const category4 = [
  {
    action: 'ti-pencil-alt',
    title: 'editor',
    items: [
      { title: 'quillEditor', path: '/editor/quilleditor' },
      { title: 'wYSIWYG', path: '/editor/wysiwyg' }
    ]
  },
  {
    action: 'ti-mouse-alt',
    title: 'dragAndDrop',
    items: [
      { title: 'vue2Dragula', path: '/drag-drop/vue2dragula' },
      { title: 'vueDraggable', path: '/drag-drop/vuedraggable' },
      { title: 'draggableResizeable', path: '/drag-drop/vuedraggableresizeable' }
    ]
  }
]
