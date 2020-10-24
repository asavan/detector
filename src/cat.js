export default {
    header: "Найди кота",
    nameConvertor : function() {
        const names = {
            'tania': "Кот"
        };
        function convert(label, found) {
            const def = names[label];
            if (def) {
                return def;
            }
            return "";
        }
        return { convert: convert}
    }()
}
