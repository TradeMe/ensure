export type ResettableSingleton = Function & {
    _reset?: () => void;
}
