

export default (cienPorCiento: number, equis: number): number => {
    var porcentaje = (equis * 100) / cienPorCiento;
    return Math.round((porcentaje + Number.EPSILON) * 100) / 100;
}
