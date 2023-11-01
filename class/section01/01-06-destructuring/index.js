// index.js

// 4. 객체 구조분해할당 방식으로 전달하기 + shorthand-property
function zzz({ banana, apple }){ // 순서 변경
    console.log(apple) // 3
    console.log(banana) // 10
}

const apple = 3
const banana = 10

// const basket = {
//     apple: apple,
//     banana: banana
// }
// Shorthand property 적용
// const basket = { apple, banana }

zzz({ apple, banana }) // 객체 그대로 넘기기