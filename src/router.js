import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const FormularioRegistrarUsuario = () => import("./components/formularios/FormularioRegistrarUsuario.vue")
const TrabalhoPage = () => import("./pages/TrabalhoPage.vue")
const VisualizarReunioes = () => import("./components/orientador/VisualizarReunioes.vue")
const VisualizarTarefas = () => import("./components/orientador/VisualizarTarefas.vue")
const VisualizarAtas = () => import("./components/orientador/VisualizarAtas.vue")
const NotificacoesPage = () => import("./pages/NotificationPage.vue")
const Teste = () => import("./teste.vue")

const routes = [
    {
        path: "/notificacoes",
        name: "Notificações",
        component: NotificacoesPage,
    },
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/trabalhos",
        component: TrabalhoPage,
    },
    {
        path: "/reunioes",
        component: VisualizarReunioes,
    },
    {
        path: "/tarefas",
        component: VisualizarTarefas,
    },
    {
        path: "/atas",
        component: VisualizarAtas,
    },
    {
        path: "/profile",
        name: "Profile",
        // lazy-loaded
        component: Profile,
    },
    {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
    },
    {
        path: "/registrar",
        name: "registrar",
        // lazy-loaded
        component: FormularioRegistrarUsuario,
    },
    {
        path: "/teste",
        name: "teste",
        // lazy-loaded
        component: Teste,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/registrar', '/teste'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // caso tente logar numa página sem login
    // vai direcionar para login
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;