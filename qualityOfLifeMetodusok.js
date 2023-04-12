export function ujTagekKozeIr(tag, parameterek = null, tartalom = "")
{
    return `<${tag}${parameterek ? " " + parameterek : ""}>${tartalom}</${tag}>`;
}

export function kepetIr(url, alt, parameterek = null)
{
    return ujParatlanTagetIr("img", `${parameterek ? parameterek + " " : null}src="${url}" alt="${alt}"`);
}

export function ujParatlanTagetIr(tag, parameterek = null)
{
    return `<${tag}${parameterek ? " " + parameterek : ""}>`;
}