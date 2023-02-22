import { Charm } from "@next/font/google";


const charm = Charm({weight: '400', subsets: ["latin"]})

const currentDate = () => {
    const date = new Date();
    const month = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'ags', 'sep', 'okt', 'nov', 'des'];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}

export { charm, currentDate };