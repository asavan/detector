export default {
    header: "Распознай лавку",
    nameConvertor: function () {
        const names = {
            'unknown': "",
            'fedorov': "Сергей Федоров",
            'pavlenko': "Алексей Павленко",
            'sava': "автор",
            'gorbushin': "Михаил Горбушин",
            'savchenko': "Надежда Савченко",
            'zelenov': "Паша Зеленов",
            'sutupov': "Пётр Сутупов",
            'nechiporenko': "ОЛЕГ",
            'abakumov':"Миша Абакумов",
            'kravchusha': "Ахаха, Наташа",
            'chukreev': "Чукреев Костя",
            'kuvaev': "Котики или ливай",
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
