// index.js

// const express = require('express')
import express from 'express';
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; // export 가져오기
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

const app = express();
// express는 기본적으로 json을 지원하고 있지 않기에 아래 코드를 추가하여 json형식 지원하도록 적용
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/boards', (req, res) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = [
        { number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요!!!" },
        { number: 2, writer: "영희", title: "영희입니다~~", contents: "영희이에요!!!" },
        { number: 3, writer: "훈이", title: "훈이입니다~~", contents: "훈이이에요!!!" },
    ]

    // 2. 꺼내온 결과 응답 주기
    res.send(result);
});

app.post('/boards', (req, res) => {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(req)
    console.log("=========================")
    console.log(req.body) // 추가

    // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

    // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
    res.send("게시물 등록에 성공하였습니다.")
});

app.post("/tokens/phone", (req, res) => {
    const myphone = req.body.qqq;
    console.log(myphone);
    // 1. 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
    const isValid = checkPhone(myphone);
    if (isValid === false) return;

    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
    res.send("인증완료!!!");
});


app.listen(3000, () => {
    console.log("백엔드 API 서버가 켜졌어요!!!");
});