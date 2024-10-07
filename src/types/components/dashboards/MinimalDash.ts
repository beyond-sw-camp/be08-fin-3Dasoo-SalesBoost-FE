import type { TablerIconComponent } from "vue-tabler-icons";
type browserStates = {
    img: string;
    name: string;
    visit: string;
    color: string;
}

type weeklyStates = {
    color: string,
        icon: TablerIconComponent;
        title: string,
        desc:string,
        percent:number,
}

export type {browserStates,weeklyStates}