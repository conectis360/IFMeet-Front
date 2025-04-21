import { createWebHistory, createRouter } from "vue-router";
const Home = () => import("./components/Home.vue");
const Login = () => import("./components/Login.vue");
const PaletasCores = () => import("./paletasCores.vue");
const ReuniaoPage = () => import("./pages/ReuniaoPage.vue");
const Profile = () => import("./components/Profile.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const FormularioRegistrarUsuario = () => import("./components/formularios/FormularioRegistrarUsuario.vue")
const TrabalhoPage = () => import("./pages/TrabalhoPage.vue")
const TarefasPage = () => import("./pages/TarefasPage.vue")
const NotificacoesPage = () => import("./pages/NotificationPage.vue")
const AtaPage = () => import("./pages/AtaPage.vue")
const Teste = () => import("./teste.vue")

const routes = [
    {
        path: "/IFMeet/notificacoes",
        name: "Notificações",
        component: NotificacoesPage,
    },
    {
        path: "/IFMeet/",
        name: "home",
        component: Home,
    },
    {
        path: "/IFMeet/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/IFMeet/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/IFMeet/trabalhos",
        name: "Trabalhos",
        component: TrabalhoPage,
    },
    {
        path: "/IFMeet/reunioes",
        name: "Reunioes",
        component: ReuniaoPage,
    },
    {
        path: "/IFMeet/tarefas",
        name: "Tarefas",
        component: TarefasPage,
    },
    {
        path: "/IFMeet/atas",
        name: "Atas",
        component: AtaPage,
    },
    {
        path: "/IFMeet/profile",
        name: "Profile",
        // lazy-loaded
        component: Profile,
    },
    {
        path: "/IFMeet/user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
    },
    {
        path: "/IFMeet/registrar",
        name: "registrar",
        // lazy-loaded
        component: FormularioRegistrarUsuario,
    },
    {
        path: "/IFMeet/teste",
        name: "teste",
        // lazy-loaded
        component: Teste,
    },
    {
        path: "/IFMeet/paleta",
        name: "paleta",
        component: PaletasCores,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/IFMeet/login', '/IFMeet/register', '/IFMeet/home', '/IFMeet/registrar', '/IFMeet/teste'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // caso tente logar numa página sem login
    // vai direcionar para login
    if (authRequired && !loggedIn) {
        next('/IFMeet/login');
    } else {
        next();
    }
});

export default router;