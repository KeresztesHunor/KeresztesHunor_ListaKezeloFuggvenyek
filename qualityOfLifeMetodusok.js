export function ujTagekKozeIr(tag, parameterek = null, tartalom = "")
{
    return `<${tag}${parameterek ? " " + parameterek : ""}>${tartalom}</${tag}>`;
}

export function kepetIr(url, alt, parameterek = null)
{
    return `<img${parameterek ? " " + parameterek : ""} src='${url}' alt='${alt}'>`;
}