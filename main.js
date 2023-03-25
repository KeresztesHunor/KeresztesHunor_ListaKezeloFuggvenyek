import { KULCS_NEVEK, OBJEKTUM_LISTA } from "./adat.js";
import { objektumosRendezes } from "./rendezes.js";
import { szuresSzovegesErtekSzerint, szuresSzamErtekSzerint } from "./szures.js";

let kutyakTabla;
let kutyakTablaBody;

let rendezesiSzempont;
let novekvoSorrend = true;

let valtoztathatoObjektumLista = OBJEKTUM_LISTA;

const KULCSOK_LISTA = (() => 
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
    //Kutyás táblázat vátának inicializálása

    kutyakTabla = $("#kutyak");
    kutyakTabla.append(ujTagekKozeIr("thead", "class='table-dark'", ujTagekKozeIr("tr", null, (() =>
    {
        let txt = "";
        KULCSOK_LISTA.forEach(kulcs =>
        {
            txt += ujTagekKozeIr("th", null, ujTagekKozeIr("a", "href='#' class='text-light text-decoration-none'", KULCS_NEVEK[kulcs]));
        });
        txt += ujTagekKozeIr("th", null, "Törlés");
        return txt;
    })())));
    kutyakTabla.append(ujTagekKozeIr("tbody", "class='table-striped'"));

    //Rendezési szempont kiválaszthatóságának inicializálása

    kutyakTablaBody = $("#kutyak > tbody");
    tablazatotKiir(kutyakTablaBody, valtoztathatoObjektumLista);
    const KUTYAK_TABLA_HEADEK = $("#kutyak > thead > tr > th > a").toArray();
    KUTYAK_TABLA_HEADEK.forEach((kutyakHead, index) =>
    {
        $(kutyakHead).on("click", event =>
        {
            event.preventDefault();
            if (rendezesiSzempont !== KULCSOK_LISTA[index])
            {
                rendezesiSzempont = KULCSOK_LISTA[index];
                novekvoSorrend = true;
            }
            else
            {
                novekvoSorrend = !novekvoSorrend;
            }
            objektumosRendezes(valtoztathatoObjektumLista, KULCSOK_LISTA[index], novekvoSorrend);
            tablazatotKiir(kutyakTablaBody, valtoztathatoObjektumLista);
        });
    });

    //Szűrési lehetőség inicializálása

    const NEV_INPUT_ELEM = $("#nev");
    const FAJTA_INPUT_ELEM = $("#fajta");
    const KOR_INPUT_ELEM = $("#kor");
    $(NEV_INPUT_ELEM).on("keyup", () =>
    {
        valtoztathatoObjektumLista = szuresSzovegesErtekSzerint(OBJEKTUM_LISTA, "nev", NEV_INPUT_ELEM.val());
        tablazatotKiir(kutyakTablaBody, valtoztathatoObjektumLista);
    });
    $(FAJTA_INPUT_ELEM).on("keyup", () =>
    {
        valtoztathatoObjektumLista = szuresSzovegesErtekSzerint(OBJEKTUM_LISTA, "fajta", FAJTA_INPUT_ELEM.val());
        tablazatotKiir(kutyakTablaBody, valtoztathatoObjektumLista);
    });
    $(KOR_INPUT_ELEM).on("change", () =>
    {
        valtoztathatoObjektumLista = szuresSzamErtekSzerint(OBJEKTUM_LISTA, objektum => eval(objektum.kor + KOR_INPUT_ELEM.val()));
        tablazatotKiir(kutyakTablaBody, valtoztathatoObjektumLista);
    });
});

function tablazatotKiir(szuloElem, lista)
{
    $(szuloElem).html((() =>
    {
        let txt = "";
        lista.forEach(objektum =>
        {
            txt += ujTagekKozeIr("tr", null, (() =>
            {
                let txt = "";
                for (const KULCS in objektum)
                {
                    txt += ujTagekKozeIr("td", null, objektum[KULCS]);
                }
                txt += ujTagekKozeIr("td", null, ujTagekKozeIr("a", "href='#' class='fw-bold fs-5 text-danger text-shadow text-decoration-none'", "&times;"));
                return txt;
            })());
        });
        return txt;
    })());
    const TORLES_GOMBOK = $(szuloElem).find("tr > td > a").toArray();
    TORLES_GOMBOK.forEach((torlesGomb, index) =>
    {
        $(torlesGomb).on("click", event =>
        {
            event.preventDefault();
            valtoztathatoObjektumLista.splice(index, 1);
            tablazatotKiir(szuloElem, valtoztathatoObjektumLista);
        });
    });
}

function ujTagekKozeIr(tag, parameterek = null, tartalom = "")
{
    return `<${tag}${parameterek ? " " + parameterek : ""}>${tartalom}</${tag}>`;
}