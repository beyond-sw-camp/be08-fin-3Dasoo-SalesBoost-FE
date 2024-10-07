import type { TablerIconComponent } from "vue-tabler-icons";
type revenueCards = {
    title: string;
    iconcolor: string;
    icon: TablerIconComponent;
    number: string;
};

type projectTable = {
    img: string;
    activestate: string;
    leadname: string;
    leademail: string;
    projectname: string;
    statuscolor: string;
    statustext: string;
    money: string;
}

type recentComments = {
    img: string;
    activeClass: string;
    username: string;
    desc: string;
    date: string;
    badgebg: string;
    status: string;
}

export type { revenueCards, projectTable, recentComments };