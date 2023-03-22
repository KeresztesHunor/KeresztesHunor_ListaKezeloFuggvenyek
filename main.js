import { SZAM_LISTA, SZOVEG_LISTA, OBJEKTUM_LISTA } from "./adat.js";

$(() =>
{
    const KEVERT_INDEXEK = keveres1(SZAM_LISTA);
    KEVERT_INDEXEK.forEach(index =>
    {
        console.log(SZAM_LISTA[index]);
    });
    console.log(SZOVEG_LISTA);
    rendezes1(SZOVEG_LISTA);
    console.log(SZOVEG_LISTA);
    SZAM_LISTA.sort();
    console.log(SZAM_LISTA);
    rendezes2(SZAM_LISTA);
    console.log(SZAM_LISTA);
});

function keveres1(lista)
{
    let megkevertIndexek = [];
    while (megkevertIndexek.length < lista.length)
    {
        const szamok = Math.floor(Math.random() * lista.length);
        let i = 0;
        while (i < megkevertIndexek.length && szamok != megkevertIndexek[i])
        {
            i++;
        }
        if (i >= megkevertIndexek.length)
        {
            megkevertIndexek.push(szamok);
        }
    }
    return megkevertIndexek;
}

function keveres2(lista)
{
    for (let i = lista.length - 1; i >= 0; i--)
    {
        const RANDOM = Math.floor(Math.random() * i);
        const IDEIGLENES = lista[i];
        lista[i] = lista[RANDOM];
        lista[RANDOM] = IDEIGLENES;
    }
    //return lista;
}

function rendezes1(lista)
{
    lista.sort(); //csak szövegre jó
}

function rendezes2(lista)
{
    lista.sort((a, b) => a - b);
}