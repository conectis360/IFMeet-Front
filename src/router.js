import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const FormularioRegistrarUsuario = () => import("./components/formularios/FormularioRegistrarUsuario.vue")
const CadastrarTrabalho = () => import("./components/orientador/CadastrarTrabalho.vue")
const Teste = () => import("./teste.vue")

const routes = [
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
        path: "/cadastrarTrabalho",
        component: CadastrarTrabalho,
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