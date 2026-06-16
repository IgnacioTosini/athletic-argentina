export function serializePrisma<T>(data: T): T {
    return JSON.parse(
        JSON.stringify(
            data,
            (_, value) =>
                typeof value === "object" &&
                    value?.constructor?.name === "Decimal"
                    ? Number(value)
                    : value
        )
    );
}