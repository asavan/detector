export default {
    header: "Помоги Даше найти себя",
    nameConvertor: function () {
        const names = {
            'unknown': "Данила",
            'membrana': "Nedanila",
            'sava': "автор"
        };

        function convert(label, found) {
            const def = names[label];
            if (def != null) {
                if (found && found.gender === 'female' && label === 'unknown') {
                    return "";
                }
                return def;
            }
            return label;
        }

        return {convert: convert}
    }()
}
