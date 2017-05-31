
import express from 'express'

let router = express.Router();
import report from '../controller/report'
//report
//
router.use('/report/log',report.log);
router.use('/report/getLog',report.getLog)
router.use('/report/getSourceMap',report.getSourceMap)

export default router;

