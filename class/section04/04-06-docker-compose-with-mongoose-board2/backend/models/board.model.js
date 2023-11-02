// board.model.js

import mongoose from 'mongoose'

// Mongoose는 Schema less인 MongoDB에서 필드 타입을 정의 해 놓고 안전하게 사용 할 수 있게 해줌
const boardSchema = new mongoose.Schema({
    writer: String,
    title: String,
    contents: String
})

export const Board = mongoose.model("Board", boardSchema)