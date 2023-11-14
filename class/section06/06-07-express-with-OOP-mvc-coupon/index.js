// index.js

// const express = require('express') // 옛날방식 => commonjs
import express from 'express'         // 요즘방식 => module
import { CouponController } from './controllers/coupon.controller.js'
import { ProductController } from './controllers/product.controller.js'

const app = express()

// 상품 APIß
const productController = new ProductController()
app.post("/products/buy", productController.buyProduct) // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct) // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController()
app.post("/coupons/buy", couponController.buyCoupon) // 쿠폰(상품권) 구매하기 API

app.listen(3000, () => {
    console.log("백엔드 API 서버거 켜졌어요!!!")
})