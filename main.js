import { SZAM_LISTA, SZOVEG_LISTA, KULCS_NEVEK, OBJEKTUM_LISTA } from "./adat.js";

let kutyakTabla;

let rendezesiSzempont;
let csokkenoSorrend = false;

const KULCSOK_LISTA = (()=> 
{
    const LISTA = [];
    for (const KULCS in KULCS_NEVEK)
    {
        LISTA.push(KULCS);
    }
    return LISTA;
})();

$(() =>
{
    /*const KEVERT_INDEXEK = keveres1(SZAM_LISTA);
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
    console.log(SZAM_LISTA);*/
    kutyakTabla = $("#kutyak");
    kutyakTabla.append(ujTagekKozeIr("tr", null, (() =>
    {
        let txt = "";
        KULCSOK_LISTA.forEach(kulcs =>
        {
            txt += ujTagekKozeIr("th", null, KULCS_NEVEK[kulcs]);
        });
        return txt;
    })()));
    kutyasTablazatotKiir();
    const KUTYAK_TABLA_HEADEK = $("#kutyak > tr:first > th").toArray();
    KUTYAK_TABLA_HEADEK.forEach((tablaHead, index) =>
    {
        $(tablaHead).on("click", () =>
        {
            if (rendezesiSzempont !== KULCSOK_LISTA[index])
            {
                rendezesiSzempont = KULCSOK_LISTA[index];
                csokkenoSorrend = false;
                objektumosRendezes(OBJEKTUM_LISTA, KULCSOK_LISTA[index], csokkenoSorrend);
            }
            else
            {
                csokkenoSorrend = !csokkenoSorrend;
                objektumosRendezes(OBJEKTUM_LISTA, KULCSOK_LISTA[index], csokkenoSorrend);
            }
            kutyasTablazatotKiir();
        });
    });
});

function kutyasTablazatotKiir()
{
    $(kutyakTabla).children().slice(1).remove();
    OBJEKTUM_LISTA.forEach(objektum =>
    {
        kutyakTabla.append(ujTagekKozeIr("tr", null, (() =>
        {
            let txt = "";
            for (const KULCS in objektum)
            {
                txt += ujTagekKozeIr("td", null, objektum[KULCS]);
            }
            return txt;
        })()));
    });
}

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

function objektumosRendezes(lista, attributum, csokkenoSorrend)
{
    switch (typeof(lista[0][attributum]))
    {
        case "string":
            lista.sort(!csokkenoSorrend ? (a, b) => a[attributum].localeCompare(b[attributum]) : (a, b) => b[attributum].localeCompare(a[attributum]));
            break;
        case "number":
            lista.sort(!csokkenoSorrend ? (a, b) => a[attributum] - b[attributum] : (a, b) => b[attributum] - a[attributum]);
            break;
        default:
            console.log("A listát nem lehetett szortírozni mert nincs a kiválasztott attribútum adattípusára megfelelő szortírozási módszer!");
            break;
    }
}

function ujTagekKozeIr(tag, parameterek = null, tartalom = "")
{
    return `<${tag}${parameterek ? " " + parameterek : ""}>${tartalom}</${tag}>`;
}