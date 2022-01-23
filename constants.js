const DEFAULT_STUDENTS = [
    { id: 1, name: "Александрович Илья", value: null },
    { id: 2, name: "Аношка Даниил", value: null },
    { id: 3, name: "Арико Владислав", value: null },
    { id: 4, name: "Бруёк Илья", value: null },
    { id: 5, name: "Василенко Богдан", value: null },
    { id: 6, name: "Волосюк Даниил", value: null },
    { id: 7, name: "Ганисевский Владислав", value: null },
    { id: 8, name: "Говша Арсений", value: null },
    { id: 9, name: "Голомбевский Андрей", value: null },
    { id: 10, name: "Гордынец Илья", value: null },
    { id: 11, name: "Жуков Владислав", value: null },
    { id: 12, name: "Заводник Владислав", value: null },
    { id: 13, name: "Калашников Никита", value: null },
    { id: 14, name: "Карач Евгений", value: null },
    { id: 15, name: "Китурко Роман", value: null },
    { id: 16, name: "Перегуд Дмитрий", value: null },
    { id: 17, name: "Прокатень Артем", value: null },
    { id: 18, name: "Сахута Данила", value: null },
    { id: 19, name: "Сукач Роман", value: null },
    { id: 20, name: "Тарас Максим", value: null }
];

const GROUP_NAME = "1820";

const VALUES = {
    yes: "yes",
    yv: "yv",
    pn: "pn",
    null: null
};

const VALUES_CLASSES = {
    [VALUES.yes]: "yes",
    [VALUES.yv]: "yv",
    [VALUES.pn]: "pn",
    [VALUES.null]: "null"
};

const ALL_CLASSES = Object.entries(VALUES_CLASSES).map(e => e[1]);

const VALUES_NAMES = {
    [VALUES.yes]: "Есть",
    [VALUES.yv]: "УВ",
    [VALUES.pn]: "ПН"
};

const VALUES_FOR_JOURNAL = {
    [VALUES.yes]: ".",
    [VALUES.yv]: "у",
    [VALUES.pn]: "н",
    [VALUES.null]: "/"
};

const GOOGLE_SHEETS_SEPARATOR = "	";

const VALUES_FOR_DECANAT = {
    [VALUES.yv]: "ув",
    [VALUES.pn]: "",
};
