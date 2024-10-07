import type { browserStates, weeklyStates } from "@/types/components/dashboards/MinimalDash";
import { MessageDotsIcon, ShoppingCartIcon, StarIcon } from 'vue-tabler-icons';
import img1 from '@/assets/images/browser/chrome-logo.png';
import img2 from '@/assets/images/browser/firefox-logo.png';
import img3 from '@/assets/images/browser/safari-logo.png';
import img4 from '@/assets/images/browser/internet-logo.png';
import img5 from '@/assets/images/browser/opera-logo.png';
import img6 from '@/assets/images/browser/internet-logo.png';
import img7 from '@/assets/images/browser/firefox-logo.png';

const browserStatesData: browserStates[] = [
  {
    img: img1,
    name: "Google Chrome",
    visit: "25%",
    color: "primary",
  },
  {
    img: img2,
    name: "Mozila Firefox",
    visit: "25%",
    color: "secondary",
  },
  {
    img: img3,
    name: "Apple Safari",
    visit: "25%",
    color: "warning",
  },
  {
    img: img4,
    name: "Internet Explorer",
    visit: "25%",
    color: "error",
  },
  {
    img: img5,
    name: "Opera mini",
    visit: "25%",
    color: "info",
  },
  {
    img: img6,
    name: "Microsoft edge",
    visit: "25%",
    color: "success",
  },
  {
    img: img7,
    name: "Mozila Firefox",
    visit: "25%",
    color: "secondary",
  },
];

const weeklyStatesData: weeklyStates[] = [
  {
    color: "primary",
    icon: ShoppingCartIcon,
    title: "Top Sales",
    desc: "Johnathan Doe",
    percent: 68,
  },
  {
    color: "warning",
    icon: StarIcon,
    title: "Best Seller",
    desc: "MaterialPro Admin",
    percent: 45,
  },
  {
    color: "success",
    icon: MessageDotsIcon,
    title: "Most Commented",
    desc: "Ample Admin",
    percent: 10,
  },
]

export { browserStatesData,weeklyStatesData }