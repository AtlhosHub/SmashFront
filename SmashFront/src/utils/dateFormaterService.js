export const dateFormater = (timestamp) => {
    if (timestamp === null || timestamp === undefined) {
        return null;
    }

    const date = new Date(timestamp);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    return formattedDate.replace(',', ' -').replace(' ', ' ');
}