import { KULCS_NEVEK, ADAT_FORMATUM_MEGKOTESEK, OBJEKTUM_LISTA } from "./adat.js";
import { objektumosRendezes } from "./rendezes.js";
import { szuresSzovegesErtekSzerint, szuresSzamErtekSzerint } from "./szures.js";
import { ujTagekKozeIr, kepetIr } from "./qualityOfLifeMetodusok.js";

let kutyakTabla;
let kutyakTablaBody;

let rendezesiSzempont;
let novekvoSorrend = true;

let felvivoFormLenyitva = false;

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
    //Új kutya felvitele form lenyitásának inicializálása

    const UJ_KUTYA_FELVITELE_LENYITO = $("#ujKutyaFelviteleLenyito")[0];
    const UJ_KUTYA_FELVITELE_FORM = $("#ujKutyaFelvitele")[0];
    $(UJ_KUTYA_FELVITELE_LENYITO).html("&#9660;");
    $(UJ_KUTYA_FELVITELE_FORM).css("display", "none")
    $(UJ_KUTYA_FELVITELE_LENYITO).on("click", event =>
    {
        event.preventDefault();
        felvivoFormLenyitva = !felvivoFormLenyitva;
        $(UJ_KUTYA_FELVITELE_LENYITO).html(felvivoFormLenyitva ? "&#9650;" : "&#9660;");
        $(UJ_KUTYA_FELVITELE_FORM).css("display", felvivoFormLenyitva ? "block" : "none");
    });

    //Kutyás táblázat címeinek inicializálása

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
    kutyakTabla.append(ujTagekKozeIr("tbody"));

    //Új kutya felvitelének lehetőségének inicializálása

    kutyakTablaBody = $("#kutyak > tbody");
    const INPUT_MEZOK = $("#ujKutyaFelvitele > div > input").toArray();
    $(UJ_KUTYA_FELVITELE_FORM).on("submit", event =>
    {
        event.preventDefault();
        if (helyesAdatok(INPUT_MEZOK))
        {
            const OBJEKTUM = {};
            INPUT_MEZOK.forEach(inputMezo =>
            {
                OBJEKTUM[$(inputMezo).attr("id")] = $(inputMezo).val();
            });
            OBJEKTUM_LISTA.push(OBJEKTUM);
            tablazatotKiir(kutyakTablaBody, OBJEKTUM_LISTA);
        }
    });

    //Rendezési szempont kiválaszthatóságának inicializálása

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

    const NEV_INPUT_ELEM = $("#iNev");
    const FAJTA_INPUT_ELEM = $("#iFajta");
    const KOR_INPUT_ELEM = $("#iKor");
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

function helyesAdatok(inputMezok)
{
    for (let i = 0; i < inputMezok.length; i++)
    {
        const ID = $(inputMezok[i]).attr("id");
        if (ADAT_FORMATUM_MEGKOTESEK.hasOwnProperty(ID) && !ADAT_FORMATUM_MEGKOTESEK[ID].test($(inputMezok[i]).val()))
        {
            alert(`Hiba! A megadott ${KULCS_NEVEK[ID].toLowerCase()} nem követi a megszabott formátumot.`);
            return false;
        }
    }
    return true;
}