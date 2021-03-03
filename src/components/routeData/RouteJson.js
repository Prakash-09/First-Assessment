import Home from '../home/Home';
import Dashboard from '../dashboard/Dashboard';
// import UserTasks from '../usertasks/UserTasks';
import customDefaultComponent from '../customDefaultComponent/CustomDefaultPage';
import Solutions from '../solutions/Solutions';
// import Environments from '../environments/Environments';


export default [
    {
        id: "home1",
        to: "/Home",
        exact: true,
        label: "Home",
        component: Home,
        icon: "fa fa-home",
        subMenu: false,
    },
    {
        id: "dashboard1",
        to: "/Dashboard",
        exact: true,
        label: "Dashboard",
        component: Dashboard,
        icon: "fa fa-user-cog",
        subMenu: true,
        children: []
    },
    {
        id: "usertasks1",
        to: "/Usertasks",
        exact: true,
        label: "User Tasks",
        component: customDefaultComponent,
        icon: "fa fa-tasks",
        subMenu: true,
        children: []
    },
    {
        id: "solutions1",
        to: "/Solutions",
        exact: true,
        label: "Solutions",
        component: Solutions,
        icon: "fa fa-atom",
        subMenu: true,
        children: []
    },
    {
        id: "environments1",
        to: "/Environments",
        exact: true,
        label: "Environments",
        component: customDefaultComponent,
        icon: "fa fa-cloud-meatball",
        subMenu: true,
        children: []
    },
    // { 
    //     id: "datastores1",
    //     to: "/Data stores",
    //     exact: true,
    //     label: "Data stores",
    //     component: "DataStores",
    //     icon: "fa fa-database"
    // },
    // {   id: "signOut1",
    //     to: "/SignOut",
    //     exact: true,
    //     label: "Sign Out",
    //     component: "SignOut",
    //     icon: "fa fa-sign-out-alt"
    // },
]