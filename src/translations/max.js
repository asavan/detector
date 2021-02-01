export default {
    header: "Найди Макса на фото",
    nameConvertor : function() {
        const names = {
            'fil': "Фил",
            'max': "Макс",
            'pavluhin': "Паша",
            'gec': "Паша",
            'vadim': "Вадим"
        };

        function convert(label, found) {
            const def = names[label];
            if (def != null) {
                return def;
            }
            return label;
        }

        return {convert: convert}
    }()
}
