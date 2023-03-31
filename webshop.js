import { KULCS_NEVEK, OBJEKTUM_LISTA } from "./adat.js";
import { ujTagekKozeIr, kepetIr } from "./qualityOfLifeMetodusok.js";

$(() =>
{
    const WEBSHOP_KUTYAK = $("#webshopKutyak");
    WEBSHOP_KUTYAK.html((() =>
    {
        let txt = "";
        OBJEKTUM_LISTA.forEach(kutya =>
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
                    txt += ujTagekKozeIr("button", "type='button' class='megtekintGomb btn btn-primary'", "Megtekint");
                    txt += ujTagekKozeIr("button", "type='button' class='kosarbaGomb btn btn-primary'", "Kosárba");
                    return txt;
                })());
                return txt;
            })());
        });
        return txt;
    })());
    const MEGTEKINT_GOMBOK = $(WEBSHOP_KUTYAK).find("div > .card-footer > megtekintGomb").toArray();
    MEGTEKINT_GOMBOK.forEach(megtekintGomb =>
    {
        
    });
});