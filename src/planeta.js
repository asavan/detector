export default {
    header: "Определитель планеты по фото",
    nameConvertor : function() {
        const names = {
            'unknown': "Землянин",
            'anna': "Аня",
            'fedia': "Федя",
            'vasya': "Вася",
            'iliya': "Илюха",
            'vitya': "Витя",
            'misha': "Миша",
            'makarov': "Сергей",
            'serg': "Серж",
            'sava': "Саша",
            'ira': "Ира",
            'mewok': "Андрей",
            'pawa': "Паша",
            'taras': "Тарас",
            'kolobok': "Пухляш",
            'usy': "Егор"
        };

        function convert(label, found) {
            const def = names[label];
            if (def) {
                if (found && found.gender === 'female' && label === 'unknown') {
                    return "Землянка";
                }
                return def;
            }
            return label;
        }

        return {convert: convert}
    }()
}
