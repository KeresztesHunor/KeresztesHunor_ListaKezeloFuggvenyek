export function objektumosRendezes(lista, kulcs, movekvoSorrend)
{
    switch (typeof(lista[0][kulcs]))
    {
        case "string":
            lista.sort(movekvoSorrend ? (a, b) => a[kulcs].localeCompare(b[kulcs]) : (a, b) => b[kulcs].localeCompare(a[kulcs]));
            break;
        case "number":
            lista.sort(movekvoSorrend ? (a, b) => a[kulcs] - b[kulcs] : (a, b) => b[kulcs] - a[kulcs]);
            break;
        default:
            console.log("A listát nem lehetett szortírozni mert nincs a kiválasztott attribútum adattípusára megfelelő szortírozási módszer!");
            break;
    }
}

//Ez a metódus több szempont szerint rendez.
//Bármilyen listát tud rendezni amiben csak objektumok vannak.
//Így lehet például meghívni: komplexObjektumListaRendezes(szemelyek, ["kor", "nev", "magassag"], [true, true, false]);
//Ebben az esetben bepasszoltunk egy "szemelyek" listát amiben az objektumok kulcsai: "nev", "kor" és "magassag".
//A második paraméter egy lista amely elemeinek sorrendje meghatározza a rendezési szempontok fontossági sorrendjét.
//A harmadik paraméter egy boolean lista melynek elemei párhuzamosan kapcsolódnak a kulcsokhoz.
//Ebben az esetben a kulcs lista elemeihez tartozó értékek: "kor" - true, "nev" - true és "magassag" - false.
//A boolean értéke dönti el, hogy a lista növekvő, vagy csökkenő sorrendben legyen.
//Ebben az esetben a "kor" a legfontosabb rendezési szempont és mivel a hozzá tartozó boolean érték true, ezért növekvő sorrendben lesz.
//De ha két embernek ugyanaz a kora, akkor a "nev" szerint fogja rendezni és mivel a "nev" kulcshoz tartozó boolean érték true, ezért ez is növekvő sorrendben lesz (illetve abc sorrendben).
//Ha viszont a nevük is megegyezik, akkor már a "magassag" kulcs szerint fog rendezni és mivel a hozzá tartozó boolean érték false, ezért csökkenő sorrendben lesz.
//A metódust úgy is meg lehet hívni, hogy a boolean lista rövidebb mint a szempontok lista, vagy akár nem is passzolunk be boolean listát.
//Ezekben az esetekben az alapértelmezett sorrend a növekvő.

export function komplexObjektumListaRendezes(lista, szempontSorrend, szempontokSzerintiSorrend = [])
{
    lista.sort((a, b) =>
    {
        for (let i = 0; i < szempontSorrend.length; i++)
        {
            const KULCS = szempontSorrend[i];
            const IRANY = (szempontokSzerintiSorrend[i] ?? true) ? 1 : -1; //Ha a boolean lista rövidebb mint a szempontok lista, akkor lehet, hogy üres értékeket olvasna ki a listából, ezért, ha üres az érték, akkor az alapértelmezett érték: true (ez a "??" operátor funkciója).
            const A_ERTEK = a[KULCS];
            const B_ERTEK = b[KULCS];
            if (typeof(A_ERTEK) === "string" && typeof(B_ERTEK) === "string") //Ha az "a" és "b" bepasszolt objektumoknak van "KULCS" kulcsa, és mindkettő érték típusa string, akkor össze tudjuk hasonlítani őket.
            {
                const SORREND = A_ERTEK.localeCompare(B_ERTEK);
                if (SORREND !== 0) //Ha az összehasonlított értékek különbözőek (ergo: "SORREND !== 0"), akkor tudjuk a jelenleg vizsgált kulcs szerint rendezni.
                {
                    return IRANY * SORREND;
                }
            }
            else if (typeof(A_ERTEK) === "number" && typeof(B_ERTEK) === "number") //Ha az "a" és "b" bepasszolt objektumoknak van "KULCS" kulcsa, és mindkettő érték típusa number, akkor össze tudjuk hasonlítani őket.
            {
                const SORREND = A_ERTEK - B_ERTEK;
                if (SORREND !== 0) //Ha az összehasonlított értékek különbözőek (ergo: "SORREND !== 0"), akkor tudjuk a jelenleg vizsgált kulcs szerint rendezni.
                {
                    return IRANY * SORREND;
                }
            }
        }
        return 0; //Ha mindegyik kulcshoz tartozó értékek megegyeznek, vagy egyik megadott kulcs szerint sem lehet rendezni, akkor ne váltsa fel az értékeket.
    });
}