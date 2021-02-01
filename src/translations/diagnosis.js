export default {
    header: "Диагноз по фото или видео",
    nameConvertor : function() {
        const names = {
            'ira': "Рак"
        };
        function convert(label, found) {
            const def = names[label];
            if (def) {
                return def;
            }
            if (found && found.gender === 'female') {
                return "Здорова!"
            }
            return "Здоров!";
        }
        return { convert: convert}
    }()
}
