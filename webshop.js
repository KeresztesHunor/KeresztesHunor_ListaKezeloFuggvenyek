import { KULCS_NEVEK, OBJEKTUM_LISTA } from "./adat.js";
import { ujTagekKozeIr, kepetIr } from "./qualityOfLifeMetodusok.js";

let webshopAutok;
let autoMegtekintKep;

let valtoztathatoObjektumLista = OBJEKTUM_LISTA;

let megtekintesAblakKepIndex = 0;

$(() =>
{
    //Oldal betöltésénél autók kiírása

    webshopAutok = $("#webshopAutok");
    autokatKiir();

    //Felugró ablak inicializálása

    autoMegtekintKep = $("#autoMegtekintKep");
    const AUTOK_MEGTEKINT_ABLAK_BALRA_GOMB = $("#balraGomb");
    const AUTOK_MEGTEKINT_ABLAK_JOBBRA_GOMB = $("#jobbraGomb");
    $(AUTOK_MEGTEKINT_ABLAK_BALRA_GOMB).on("click", () =>
    {
        if (--megtekintesAblakKepIndex < 0)
        {
            megtekintesAblakKepIndex = valtoztathatoObjektumLista.length - 1;
        }
        autokMegtekintAblakKepetCserel(megtekintesAblakKepIndex);
    });
    $(AUTOK_MEGTEKINT_ABLAK_JOBBRA_GOMB).on("click", () =>
    {
        if (++megtekintesAblakKepIndex > valtoztathatoObjektumLista.length - 1)
        {
            megtekintesAblakKepIndex = 0;
        }
        autokMegtekintAblakKepetCserel(megtekintesAblakKepIndex);
    });
});

function autokatKiir()
{
    webshopAutok.html((() =>
    {
        let txt = "";
        valtoztathatoObjektumLista.forEach(auto =>
        {
            txt += ujTagekKozeIr("div", "class='card flex-item'", (() =>
            {
                let txt = "";
                txt += kepetIr(`kepek/${auto.kep}`, `${auto.gyarto} ${auto.nev} (${auto.evjarat})`, "class='card-img-top'");
                txt += ujTagekKozeIr("div", "class='card-header'", ujTagekKozeIr("h5", "class='card-title'", `${auto.gyarto} ${auto.nev}`));
                txt += ujTagekKozeIr("div", "class='card-body'", ujTagekKozeIr("ul", "class='list-group list-group-flush'", (() =>
                {
                    let txt = "";
                    txt += ujTagekKozeIr("li", "class='list-group-item'", `${KULCS_NEVEK.evjarat}: ${auto.evjarat}`);
                    txt += ujTagekKozeIr("li", "class='list-group-item'", `${KULCS_NEVEK.loero}: ${auto.loero}`);
                    return txt;
                })()));
                txt += ujTagekKozeIr("div", "class='card-footer d-flex justify-content-around'", (() =>
                {
                    let txt = "";
                    txt += ujTagekKozeIr("button", "type='button' class='megtekintGomb btn btn-primary' data-bs-toggle='modal' data-bs-target='#autokMegtekintAblak'", "Megtekint");
                    txt += ujTagekKozeIr("button", "type='button' class='kosarbaGomb btn btn-primary'", "Kosárba");
                    return txt;
                })());
                return txt;
            })());
        });
        return txt;
    })());
    const AUTO_MEGTEKINT_GOMBOK = $(".megtekintGomb").toArray();
    AUTO_MEGTEKINT_GOMBOK.forEach((autoMegtekintGomb, index) =>
    {
        $(autoMegtekintGomb).on("click", () =>
        {
            megtekintesAblakKepIndex = index;
            autokMegtekintAblakKepetCserel(megtekintesAblakKepIndex);
        });
    });
}

function autokMegtekintAblakKepetCserel(listaIndex)
{
    const AUTO = valtoztathatoObjektumLista[listaIndex];
    autoMegtekintKep.html(kepetIr(`kepek/${AUTO.kep}`, `${AUTO.gyarto} ${AUTO.nev} (${AUTO.evjarat})`));
}