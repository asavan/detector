export default {
    header: "Распознай лавку",
    nameConvertor: function () {
        const names = {
            'unknown': "",
            'abakumov':"Миша Абакумов",
            'bugaevsky': "Андрей",
            'chukreev': "Чукреев Костя",
            'eureka': "Женя",
            'fedorov': "Сергей Федоров",
            'gorbushin': "Михаил Горбушин",
            'gusev': "Арсентий",
            'kravchusha': "Ахаха, Наташа",
            'kuvaev': "Котики или ливай",
            'meshkevich': "Роман",
            'matancev': "Федя",
            'verhovyh': "Лера",
            'nechiporenko': "ОЛЕГ",
            'pavlenko': "Алексей Павленко",
            'saifutdinov': "Юра",
            'sava': "автор",
            'savchenko': "Надежда Савченко",
            'shpilkovsky': "Андрей",
            'zelenov': "Паша Зеленов",
            'sutupov': "Пётр Сутупов",
            'lebedev': "Роман Лебедев"
        };

        function convert(label, found) {
            const def = names[label];
            if (def != null) {
                if (found && found.gender === 'female' && label === 'unknown') {
                    return "Незнакомка";
                }
                return def;
            }
            return label;
        }

        return {convert: convert}
    }()
}
