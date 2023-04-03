import { KULCS_NEVEK, ADAT_FORMATUM_MEGKOTESEK, OBJEKTUM_LISTA } from "./adat.js";
import { objektumosRendezes } from "./rendezes.js";
import { szuresSzovegesErtekSzerint, szuresSzamErtekSzerint } from "./szures.js";
import { ujTagekKozeIr, kepetIr, ujParatlanTagetIr } from "./qualityOfLifeMetodusok.js";

let autokTablaBody;

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
    //Új autó felvitele form lenyitásának inicializálása

    const UJ_AUTO_FELVITELE_LENYITO = $("#ujAutoFelviteleLenyito")[0];
    const UJ_AUTO_FELVITELE_FORM = $("#ujAutoFelvitele")[0];
    $(UJ_AUTO_FELVITELE_LENYITO).html("&#9660;");
    $(UJ_AUTO_FELVITELE_FORM).css("display", "none")
    $(UJ_AUTO_FELVITELE_LENYITO).on("click", event =>
    {
        event.preventDefault();
        felvivoFormLenyitva = !felvivoFormLenyitva;
        $(UJ_AUTO_FELVITELE_LENYITO).html(felvivoFormLenyitva ? "&#9650;" : "&#9660;");
        $(UJ_AUTO_FELVITELE_FORM).css("display", felvivoFormLenyitva ? "block" : "none");
    });

    //Autós táblázat oszlop szélességeinek inicializálása

    const AUTOK_TABLA_COLGROUP = $("#autok > colgroup");
    AUTOK_TABLA_COLGROUP.css("--oszlopok-szama", KULCSOK_LISTA.length + 1);
    $(AUTOK_TABLA_COLGROUP).html((() =>
    {
        let txt = "";
        for (let i = 0; i < KULCSOK_LISTA.length + 1; i++)
        {
            txt += ujParatlanTagetIr("col");
        }
        return txt;
    })());

    //Autós táblázat címeinek inicializálása

    const AUTOK_TABLA_HEADEK = $("#autok > thead > tr > th").toArray();
    const AUTOK_TABLA_INPUT_MEZOK = $("#autok > thead > tr > th > input").toArray();
    for (let i = 0; i < AUTOK_TABLA_INPUT_MEZOK.length; i++)
    {
        $(AUTOK_TABLA_HEADEK[i]).prepend(ujTagekKozeIr("a", "href='#' class='text-light text-decoration-none'", KULCS_NEVEK[KULCSOK_LISTA[i]]));
    }

    //Új autó felvitelének lehetőségének inicializálása

    autokTablaBody = $("#autok > tbody");
    const INPUT_MEZOK = $("#ujAutoFelvitele > div > input").toArray();
    $(UJ_AUTO_FELVITELE_FORM).on("submit", event =>
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
            tablazatotKiir(autokTablaBody, OBJEKTUM_LISTA);
        }
    });

    //Rendezési szempont kiválaszthatóságának inicializálása

    tablazatotKiir(autokTablaBody, valtoztathatoObjektumLista);
    const AUTOK_TABLA_HEADEK_SZOVEG = $("#autok > thead > tr > th > a").toArray();
    AUTOK_TABLA_HEADEK_SZOVEG.forEach((autokHead, index) =>
    {
        $(autokHead).on("click", event =>
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
            tablazatotKiir(autokTablaBody, valtoztathatoObjektumLista);
        });
    });

    //Szűrési lehetőség inicializálása

    const GYARTO_INPUT_ELEM = $("#iGyarto");
    const NEV_INPUT_ELEM = $("#iNev");
    const EVJARAT_INPUT_ELEM = $("#iEvjarat");
    const LOERO_INPUT_ELEM = $("#iLoero");
    szuresSzovegekreInit(GYARTO_INPUT_ELEM);
    szuresSzovegekreInit(NEV_INPUT_ELEM);
    szuresSzamOsszehasonlitasraInit(EVJARAT_INPUT_ELEM);
    szuresSzamOsszehasonlitasraInit(LOERO_INPUT_ELEM);
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
                KULCSOK_LISTA.forEach(kulcs =>
                {
                    txt += ujTagekKozeIr("td", null, objektum[kulcs]);
                });
                txt += ujTagekKozeIr("td", "class='text-center'", ujTagekKozeIr("a", "href='#' class='fw-bold fs-3 text-danger text-shadow text-decoration-none'", "&times;"));
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

function szuresSzovegekreInit(inputMezo)
{
    $(inputMezo).on("keyup", () =>
    {
        valtoztathatoObjektumLista = szuresSzovegesErtekSzerint(OBJEKTUM_LISTA, $(inputMezo).attr("id").slice(1).toLowerCase(), inputMezo.val());
        tablazatotKiir(autokTablaBody, valtoztathatoObjektumLista);
    });
}

function szuresSzamOsszehasonlitasraInit(inputMezo)
{
    $(inputMezo).on("change", () =>
    {
        valtoztathatoObjektumLista = szuresSzamErtekSzerint(OBJEKTUM_LISTA, objektum => eval(objektum[$(inputMezo).attr("id").slice(1).toLowerCase()] + inputMezo.val()));
        tablazatotKiir(autokTablaBody, valtoztathatoObjektumLista);
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