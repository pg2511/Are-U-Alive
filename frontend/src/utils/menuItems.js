import {dashboard, globe, deleteweb, add, help} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: globe,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Add",
        icon: add,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Delete",
        icon: deleteweb,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Help",
        icon: help,
        link: "/dashboard",
    },
]