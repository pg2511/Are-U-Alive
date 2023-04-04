import {dashboard, globe, deleteweb, add} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Websites",
        icon: globe,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Add",
        icon: add,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Delete",
        icon: deleteweb,
        link: "/dashboard",
    },
]