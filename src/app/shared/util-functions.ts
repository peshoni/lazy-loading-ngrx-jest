export function sortItems<T>(direction: string, items: T[], property: keyof T, offset: number, pageSize: number) {
    const isAsc = direction === 'asc';
    const value = items[0]?.[property];
    const temp: T[] = [...items];
    temp.sort((a, b) => {
        if (typeof value === 'number') {
            return compare(+a[property], +(b as any)[property], isAsc);
        } else {
            return compare((a as any)[property], (b as any)[property], isAsc);
        }
    });
    // console.log(temp);
    return temp.slice(offset, pageSize);
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}