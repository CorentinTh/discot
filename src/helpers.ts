type DeepRequired<T> = {
    [P in keyof Required<T>]: T[P] extends object ? DeepRequired<T[P]> : NonNullable<Required<T[P]>>
}

export {
    DeepRequired
}