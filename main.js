import { KULCS_NEVEK, OBJEKTUM_LISTA } from "./adat.js";
import { objektumosRendezes } from "./rendezes.js";
import { szuresSzovegesErtekSzerint, szuresSzamErtekSzerint } from "./szures.js";

let kutyakTabla;

let rendezesiSzempont;
let novekvoSorrend = true;

let valtoztathatoObjektumLista = OBJEKTUM_LISTA;

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
    kutyakTabla = $("#kutyak");
    kutyakTabla.append(ujTagekKozeIr("tr", null, (() =>
    {
        let txt = "";
        KULCSOK_LISTA.forEach(kulcs =>
        {
            txt += ujTagekKozeIr("th", null, KULCS_NEVEK[kulcs]);
        });
        txt += ujTagekKozeIr("th", null, "Törlés");
        return txt;
    })()));
    kutyasTablazatotKiir(kutyakTabla, valtoztathatoObjektumLista);
    const KUTYAK_TABLA_HEADEK = $("#kutyak > tr:first > th").toArray();
    KUTYAK_TABLA_HEADEK.forEach((tablaHead, index) =>
    {
        $(tablaHead).on("click", () =>
        {
            if (rendezesiSzempont !== KULCSOK_LISTA[index])
            {
                rendezesiSzempont = KULCSOK_LISTA[index];
                novekvoSorrend = true;
                objektumosRendezes(valtoztathatoObjektumLista, KULCSOK_LISTA[index], novekvoSorrend);
            }
            else
            {
                novekvoSorrend = !novekvoSorrend;
                objektumosRendezes(valtoztathatoObjektumLista, KULCSOK_LISTA[index], novekvoSorrend);
            }
            kutyasTablazatotKiir(kutyakTabla, valtoztathatoObjektumLista);
        });
    });
    const NEV_INPUT_ELEM = $("#nev");
    const KOR_INPUT_ELEM = $("#kor");
    const FAJTA_INPUT_ELEM = $("#fajta");
    $(NEV_INPUT_ELEM).on("keyup", () =>
    {
        valtoztathatoObjektumLista = szuresSzovegesErtekSzerint(OBJEKTUM_LISTA, "nev", NEV_INPUT_ELEM.val());
        kutyasTablazatotKiir(kutyakTabla, valtoztathatoObjektumLista);
    });
    $(KOR_INPUT_ELEM).on("change", () =>
    {
        valtoztathatoObjektumLista = szuresSzamErtekSzerint(OBJEKTUM_LISTA, objektum => eval(objektum.kor + KOR_INPUT_ELEM.val()));
        kutyasTablazatotKiir(kutyakTabla, valtoztathatoObjektumLista);
    });
    $(FAJTA_INPUT_ELEM).on("keyup", () =>
    {
        valtoztathatoObjektumLista = szuresSzovegesErtekSzerint(OBJEKTUM_LISTA, "fajta", FAJTA_INPUT_ELEM.val());
        kutyasTablazatotKiir(kutyakTabla, valtoztathatoObjektumLista);
    });
});

function kutyasTablazatotKiir(szuloElem, lista)
{
    $(szuloElem).children().slice(1).remove();
    lista.forEach(objektum =>
    {
        szuloElem.append(ujTagekKozeIr("tr", null, (() =>
        {
            let txt = "";
            for (const KULCS in objektum)
            {
                txt += ujTagekKozeIr("td", null, objektum[KULCS]);
            }
            txt += ujTagekKozeIr("td", null, "&times;");
            return txt;
        })()));
    });
}

function ujTagekKozeIr(tag, parameterek = null, tartalom = "")
{
    return `<${tag}${parameterek ? " " + parameterek : ""}>${tartalom}</${tag}>`;
}