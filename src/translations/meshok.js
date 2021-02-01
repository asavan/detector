export default {
    header: "Найди мешка",
    nameConvertor: function () {
        const names = {
            'unknown': "Незнакомец",
            'meshok': "Мешок",
            'ola': "Оля",
            'sava': "автор",
            'gaw': "Игорь",
            'sereja': "Сережа",
            'dawa': "Даша"
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
