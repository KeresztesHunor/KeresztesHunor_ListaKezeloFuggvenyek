import { KULCS_NEVEK, ADAT_FORMATUM_MEGKOTESEK, OBJEKTUM_LISTA } from "./adat.js";
import { objektumosRendezes } from "./rendezes.js";
import { szures } from "./szures.js";
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
const RELACIOS_JELEK = {
    egyenlo: "=",
    kisebb: "<",
    nagyobb: ">",
    kisebbEgyenlo: "<=",
    nagyobbEgyenlo: ">="
}

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

    const AUTOK_TABLA_COLGROUP = $("#autok > table > colgroup");
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

    const AUTOK_TABLA_HEAD_ROW = $("#autok > table > thead > tr");
    $(AUTOK_TABLA_HEAD_ROW).prepend((() =>
    {
        let txt = "";
        KULCSOK_LISTA.forEach((kulcs, index) =>
        {
            txt += ujTagekKozeIr("th", null, (() =>
            {
                let txt = "";
                txt += ujTagekKozeIr("a", "href='#' class='text-light text-decoration-none'", KULCS_NEVEK[kulcs]);
                switch (typeof(OBJEKTUM_LISTA[0][KULCSOK_LISTA[index]]))
                {
                    case "number":
                        txt += ujTagekKozeIr("div", null, (() =>
                        {
                            let txt = "";
                            txt += ujTagekKozeIr("select", null, (() =>
                            {
                                let txt = "";
                                for (const KULCS in RELACIOS_JELEK)
                                {
                                    txt += ujTagekKozeIr("option", `value="${KULCS}"`, RELACIOS_JELEK[KULCS]);
                                }
                                return txt;
                            })());
                            txt += ujInputMezotIr(kulcs, "number");
                            return txt;
                        })())
                        break;
                    default:
                        txt += ujInputMezotIr(kulcs, "text");
                        break;
                }
                return txt;
            })());
        });
        return txt;
    })());

    //Szűrési lehetőség inicializálása

    const AUTOK_TABLA_INPUT_MEZOK = $("#autok > table > thead > tr > th input").toArray();
    AUTOK_TABLA_INPUT_MEZOK.forEach(inputMezo =>
    {
        const INPUT_MEZO_TIPUS = $(inputMezo).attr("type");
        switch (INPUT_MEZO_TIPUS)
        {
            case "text":
                szuresInit(inputMezo, kulcs => objektum => objektum[kulcs].includes($(inputMezo).val()));
                break;
            case "number":
                szuresInit(inputMezo, kulcs =>
                {
                    const MEZO_ERTEK = $(inputMezo).val();
                    if (MEZO_ERTEK.length > 0)
                    {
                        switch ($(inputMezo).siblings("select").first().val())
                        {
                            case "kisebb":
                                return objektum => objektum[kulcs] < MEZO_ERTEK;
                            case "nagyobb":
                                return objektum => objektum[kulcs] > MEZO_ERTEK;
                            case "kisebbEgyenlo":
                                return objektum => objektum[kulcs] <= MEZO_ERTEK;
                            case "nagyobbEgyenlo":
                                return objektum => objektum[kulcs] >= MEZO_ERTEK;
                            default:
                                return objektum => objektum[kulcs] == MEZO_ERTEK; //Ide "==" összehasonlítás kell "===" helyett mert egy "number" típusú input field is "string"-gel tér vissza és túl lusta vagyok átkonvertálni számra
                        }
                    }
                    else
                    {
                        return objektum => true; //Ha a mező üres, akkor mindent írjunk ki
                    }
                });
                break;
            default:
                console.log(`Hiba! Ilyen input típusra nincs szűrési lehetőség (${INPUT_MEZO_TIPUS}).`);
                break;
        }
    });

    //Új autó felvitelének lehetőségének inicializálása

    autokTablaBody = $("#autok > table > tbody");
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
    const AUTOK_TABLA_HEADEK_SZOVEG = $("#autok > table > thead > tr > th > a").toArray();
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
                txt += ujTagekKozeIr("td", "class='text-center'", ujTagekKozeIr("a", "href='#' class='fw-bold fs-3 text-danger text-decoration-none'", "&times;"));
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

function ujInputMezotIr(kulcs, tipus)
{
    return ujParatlanTagetIr("input", `
        id="${"i" + kulcs.charAt(0).toUpperCase() + kulcs.slice(1)}"
        type="${tipus}"
        placeholder="${KULCS_NEVEK[kulcs]}"
        name="${KULCS_NEVEK[kulcs]}"
    `);
}

function szuresInit(inputMezo, feltetel)
{
    const KULCS = $(inputMezo).attr("id").slice(1).toLowerCase();
    $(inputMezo).on("input", () =>
    {
        valtoztathatoObjektumLista = szures(OBJEKTUM_LISTA, feltetel(KULCS));
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