// index.ts

// 5. generic 타입 - 2
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
    return [arg3, arg2, arg1];
}
const result1 = getGeneric2<string, number, boolean>("철수", 123, true);


// 6. generic 타입 - 3
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
    return [arg3, arg2, arg1];
}
const result2 = getGeneric3<string, number, boolean>("철수", 123, true);


// 7. generic 타입 - 4 (화살표 함수 사용)
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
    return [arg3, arg2, arg1];
};
const result3 = getGeneric4<string, number, boolean>("철수", 123, true);