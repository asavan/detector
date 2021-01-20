export default {
    header: "Найди кота",
    nameConvertor : function() {
        const names = {
            'tanya': "Кот",
            'sasha': "автор",
            'katya': "не кот",
        };
        function convert(label, found) {
            const def = names[label];
            if (def) {
                return def;
            }
            return "не кот";
        }
        return { convert: convert}
    }()
}
