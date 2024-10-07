/*import tabler icons*/
import { ActivityIcon, AnchorIcon, DeviceDesktopIcon, ShoppingCartIcon } from 'vue-tabler-icons';
import type { revenueCards, projectTable, recentComments } from '@/types/components/dashboards/ClassicDash';
import img1 from '@/assets/images/profile/1.jpg';
import img2 from '@/assets/images/profile/2.jpg';
import img3 from '@/assets/images/profile/3.jpg';
import img4 from '@/assets/images/profile/4.jpg';
import img5 from '@/assets/images/profile/5.jpg';

const revenueCardsData: revenueCards[] = [
    {
        title: "Total Revenue",
        iconcolor: "bg-secondary",
        icon: ActivityIcon,
        number: "$3249",
    },
    {
        title: "Online Revenue",
        iconcolor: "bg-warning",
        icon: DeviceDesktopIcon,
        number: "$2376",
    },
    {
        title: "Offline Revenue",
        iconcolor: "bg-primary",
        icon: ShoppingCartIcon,
        number: "$1795",
    },
    {
        title: "Ad. Expense",
        iconcolor: "bg-error",
        icon: AnchorIcon,
        number: "$687",
    },
];

const projectTableData: projectTable[] = [
    {
        img: img1,
        activestate: "",
        leadname: "Sunil Joshi",
        leademail: "Web Designer",
        projectname: "Elite Admin",
        statuscolor: "success",
        statustext: "Low",
        money: "$3.9K",
    },
    {
        img: img2,
        activestate: "active",
        leadname: "Andrew",
        leademail: "Project Manager",
        projectname: "Real Homes",
        statuscolor: "info",
        statustext: "Medium",
        money: "$23.9K",
    },
    {
        img: img3,
        activestate: "",
        leadname: "Bhavesh patel",
        leademail: "Developer",
        projectname: "MedicalPro Theme",
        statuscolor: "deep-purple accent-2 white--text",
        statustext: "High",
        money: "$12.9K",
    },
    {
        img: img4,
        activestate: "",
        leadname: "Nirav Joshi",
        leademail: "Frontend Eng",
        projectname: "Elite Admin",
        statuscolor: "error",
        statustext: "Low",
        money: "$10.9K",
    },
    {
        img: img5,
        activestate: "",
        leadname: "Micheal Doe",
        leademail: "Content Writer",
        projectname: "Helping Hands",
        statuscolor: "warning",
        statustext: "High",
        money: "$12.9K",
    },
];

const recentCommentsData: recentComments[] = [
    {
        img: img1,
        activeClass: "",
        username: "James Anderson",
        desc: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2022",
        badgebg: "secondary",
        status: "Pending",
    },
    {
        img: img2,
        activeClass: "active",
        username: "Michael Jorden",
        desc: "Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2022",
        badgebg: "success",
        status: "Approved",
    },
    {
        img: img3,
        activeClass: "",
        username: "Johnathan Doeting",
        desc: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2022",
        badgebg: "error",
        status: "Rejected",
    },
    {
        img: img4,
        activeClass: "",
        username: "James Anderson",
        desc: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2022",
        badgebg: "info",
        status: "Pending",
    },
];


export { revenueCardsData, projectTableData, recentCommentsData };
