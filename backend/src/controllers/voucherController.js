import express from 'express'
import Voucher from '../models/voucher.Mod'
const createVoucher = async (req, res) => {
    try {
        const newVoucher = Voucher.create()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error:  ${error.message} `
        })
    }
}