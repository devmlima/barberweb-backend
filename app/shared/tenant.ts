let usuarioLogado: any;

export const getUsuarioLogado = (): any => {
    return usuarioLogado;
}

export const clearUsuarioLogado = (): void => {
    usuarioLogado = null;
}

export const setUsuarioLogado = (usuario): void => {
    usuarioLogado = usuario;
}