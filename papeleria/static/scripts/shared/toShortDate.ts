

export default (fechaAjuste: Date): string => {
    var d = new Date(fechaAjuste);
        let m = d.getMonth();
        let month = "";
        switch (m) {
            case 0: month = "Ene"; break;
            case 1: month = "Feb"; break;
            case 2: month = "Mzo"; break;
            case 3: month = "Abr"; break;
            case 4: month = "May"; break;
            case 5: month = "Jun"; break;
            case 6: month = "Jul"; break;
            case 7: month = "Ago"; break;
            case 8: month = "Sep"; break;
            case 9: month = "Oct"; break;
            case 10: month = "Nov"; break;
            case 11: month = "Dic"; break;
            default: month = ""; break;
        }
        return `${d.getDate()} de ${month} / ${d.getFullYear()}`;
}