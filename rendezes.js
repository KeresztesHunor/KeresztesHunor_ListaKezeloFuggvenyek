export function objektumosRendezes(lista, kulcs, movekvoSorrend)
{
    switch (typeof(lista[0][kulcs]))
    {
        case "string":
            lista.sort(movekvoSorrend ? (a, b) => a[kulcs].localeCompare(b[kulcs]) : (a, b) => b[kulcs].localeCompare(a[kulcs]));
            break;
        case "number":
            lista.sort(movekvoSorrend ? (a, b) => a[kulcs] - b[kulcs] : (a, b) => b[kulcs] - a[kulcs]);
            break;
        default:
            console.log("A listát nem lehetett szortírozni mert nincs a kiválasztott attribútum adattípusára megfelelő szortírozási módszer!");
            break;
    }
}