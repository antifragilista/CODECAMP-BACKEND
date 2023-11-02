// const express = require('express') // 옛날방식 => commonjs
import express from 'express'         // 요즘방식 => module

import {checkEmail, getWelcomeTemplate, sendTemplateToEmail} from './email.js'
import {checkPhone, getToken, sendTokenToSMS} from './phone.js'// export 가져오기
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import {options} from './swagger/config.js'
import cors from 'cors'
import mongoose from 'mongoose'
import { Board } from './models/board.model.js'

const app = express()
app.use(express.json()) // 옛날에는 bodyParser 사용
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options))); // app.get("/qqq", (req, res, next) => { 첫번째함수... next() }, () => { 두번째함수... })
app.get('/boards', async (req, res) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = await Board.find()

    // 2. 꺼내온 결과 응답 주기
    res.send(result)
})

app.post('/boards', async (req, res) => {
    console.log(req.body);

    // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    const board = new Board({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents,
    });
    console.log(board);
    await board.save();

    // 2. 저장 결과 응답 주기
    res.send('게시물 등록에 성공하였습니다!!!!!!!');
});

// mongoose에서 실행한 명령을 MongoDB 명령어로 확인 할 수 있도록 함
mongoose.set("debug", true)
mongoose.connect("mongodb://my-database:27017/mydocker")
    .then(() => console.log("db 접속에 성공하였습니다."))
    .catch(() => console.log("db 접속에 실패하였습니다."))

app.listen(3000, () => {
    console.log("백엔드 API 서버가 켜졌어요!!!")
})