import { KULCS_NEVEK, OBJEKTUM_LISTA } from "./adat.js";
import { ujTagekKozeIr, kepetIr } from "./qualityOfLifeMetodusok.js";

let webshopKutyak;
let kutyaMegtekintKep;

let valtoztathatoObjektumLista = OBJEKTUM_LISTA;

let megtekintesAblakKepIndex = 0;

$(() =>
{
    //Oldal betöltésénél kutyák kiírása

    webshopKutyak = $("#webshopKutyak");
    kutyakatKiir();

    //Kutya megtekintő ablak gobjainak inicializálása

    const KUTYAK_MEGTEKINT_ABLAK_BALRA_GOMB = $("#balraGomb");
    const KUTYAK_MEGTEKINT_ABLAK_JOBBRA_GOMB = $("#jobbraGomb");
    $(KUTYAK_MEGTEKINT_ABLAK_BALRA_GOMB).on("click", () =>
    {
        if (--megtekintesAblakKepIndex < 0)
        {
            megtekintesAblakKepIndex = valtoztathatoObjektumLista.length - 1;
        }
        kutyakMegtekintAblakKepetCserel(megtekintesAblakKepIndex);
    });
    $(KUTYAK_MEGTEKINT_ABLAK_JOBBRA_GOMB).on("click", () =>
    {
        if (++megtekintesAblakKepIndex > valtoztathatoObjektumLista.length - 1)
        {
            megtekintesAblakKepIndex = 0;
        }
        kutyakMegtekintAblakKepetCserel(megtekintesAblakKepIndex);
    });
});

function kutyakatKiir()
{
    webshopKutyak.html((() =>
    {
        let txt = "";
        valtoztathatoObjektumLista.forEach(kutya =>
        {
            txt += ujTagekKozeIr("div", "class='card flex-item'", (() =>
            {
                let txt = "";
                txt += kepetIr(kutya.kep, `${kutya.nev} (${kutya.fajta})`, "class='card-img-top'");
                txt += ujTagekKozeIr("div", "class='card-header'", ujTagekKozeIr("h5", "class='card-title'", kutya.nev));
                txt += ujTagekKozeIr("div", "class='card-body'", ujTagekKozeIr("ul", "class='list-group list-group-flush'", (() =>
                {
                    let txt = "";
                    txt += ujTagekKozeIr("li", "class='list-group-item'", `${KULCS_NEVEK.fajta}: ${kutya.fajta}`);
                    txt += ujTagekKozeIr("li", "class='list-group-item'", `${KULCS_NEVEK.kor}: ${kutya.kor}`);
                    return txt;
                })()));
                txt += ujTagekKozeIr("div", "class='card-footer d-flex justify-content-around'", (() =>
                {
                    let txt = "";
                    txt += ujTagekKozeIr("button", "type='button' class='megtekintGomb btn btn-primary' data-bs-toggle='modal' data-bs-target='#kutyakMegtekintAblak'", "Megtekint");
                    txt += ujTagekKozeIr("button", "type='button' class='kosarbaGomb btn btn-primary'", "Kosárba");
                    return txt;
                })());
                return txt;
            })());
        });
        return txt;
    })());
    const KUTYA_MEGTEKINT_GOMBOK = $(".megtekintGomb").toArray();
    kutyaMegtekintKep = $("#kutyaMegtekintKep");
    KUTYA_MEGTEKINT_GOMBOK.forEach((kutyaMegtekintGomb, index) =>
    {
        $(kutyaMegtekintGomb).on("click", () =>
        {
            megtekintesAblakKepIndex = index;
            kutyakMegtekintAblakKepetCserel(megtekintesAblakKepIndex);
        });
    });
}

function kutyakMegtekintAblakKepetCserel(listaIndex)
{
    const KUTYA = valtoztathatoObjektumLista[listaIndex];
    kutyaMegtekintKep.html(kepetIr(KUTYA.kep, `${KUTYA.nev} (${KUTYA.fajta})`));
}