export function szuresSzovegesErtekSzerint(lista, kulcs, ertek)
{
    return lista.filter(objektum => objektum[kulcs].includes(ertek));
}

export function szuresSzamErtekSzerint(lista, feltetel)
{
    return lista.filter(feltetel);
}